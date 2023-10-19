const sequelize = require('sequelize')
const {Sales, SalesDetails, Users} = require('../db');
const moment = require('moment');
const sales = {}


async function create(amount, payment_method, dte_code, dte_number, stock_control, user_id){
    const sale = await Sales.create({
        amount: amount,
        payment_method: payment_method,
        dte_code: dte_code,
        dte_number: dte_number,
        stock_control: stock_control,
        user_id: user_id
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})

    return sale
}

async function find_all(){
    const sale =  await Sales.findAll(
       {include: SalesDetails}
        ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function findAllBetweenDates(start, end){
    const sale = await Sales.findAll(
        {
            include: [{model: SalesDetails, model: Users}], 
            where: {createdAt: {[sequelize.Op.between]: [start, end]}}, 
            order: [['createdAt', 'DESC']]
        }
    ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function findOneById(id){
    const sale = await Sales.findOne(
        {
            include: [{model: SalesDetails}, {model: Users}],
            where: {id:id}
        }
        ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
        console.log(sale)
    return sale
    
}

async function destroy(id){
    const sale = await Sales.destroy({where:{id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}


async function findAllBetweenDateGroupByDate(start, end){
    const sale = await Sales.findAll({
        attributes: [
            [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
          ],
          where: { createdAt: { [sequelize.Op.between]: [start, end] } },
          group: [sequelize.fn('DATE', sequelize.col('created_at'))],
          order: [[sequelize.fn('DATE', sequelize.col('created_at')), 'ASC']]   
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function findAllBetweenDateGroupByPayment(start, end){
    const sale = await Sales.findAll({
        attributes: [
            [sequelize.col('payment_method'), 'payment_method'],
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
          ],
          where: { createdAt: { [sequelize.Op.between]: [start, end] } },
          group: ['payment_method']  
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function findAllBetweenDateGroupByDte(start, end){
    const sale = await Sales.findAll({
        attributes: [
            [sequelize.col('dte_code'), 'dte_code'],
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
          ],
          where: { createdAt: { [sequelize.Op.between]: [start, end] } },
          group: ['dte_code']  
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

// async function find_all_by_date_range_group_by_category(start_date, end_date){
//     const sale = await Sales.findAll({
     
//         // sort: ['createdAt', 'DESC'],
//         // attributes: [
//         //     [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
//         //     [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
//         // ],
//         // group: ['date'],
//         include: [{model:SalesDetails, include: [{model:Products, include:[Categories, Prices]}]}],
//         // where: [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), date)]
//         where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}}     
//     }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
//     return sale
// }

async function find_all_one_date(date){
    //console.log('esta es la date     ------> :'+ date)
    const sale = await Sales.findOne({
        
        attributes: [
            [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
            //[sequelize.cast(sequelize.fn('SUM', sequelize.col('amount')), 'int'), 'total_amount']
            [sequelize.fn('SUM', sequelize.col('amount')), 'total_amount'],
        ],
        group: ['date'],
        where: 
        [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), date)]
        //where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}}     
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_one_min_create(){
    const sale = await Sales.findOne(
        // {attributes: [sequelize.fn('MIN', sequelize.col('created_at'))]}
        {order: [
            [sequelize.literal('created_at'), 'asc']
     ]}
    ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    console.log(sale)
    return sale
}

async function find_all_by_month_and_year(month, year){
    const sale = await Sales.findAll(
        {where: [sequelize.where(sequelize.fn('MONTH', sequelize.col('created_at')), month),
        sequelize.where(sequelize.fn('YEAR', sequelize.col('created_at')), year)] 
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

async function find_all_by_date_range(start_date, end_date){
    const sale = await Sales.findAll({
        
        attributes: [
            'id',
            'amount',
            'payment_method',
            
            [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
            [sequelize.fn('TIME', sequelize.col('created_at')), 'time'],
            'created_at'],
        // where: [sequelize.where(sequelize.fn('DATE', sequelize.col('created_at')), date)]
        where: {createdAt: {[sequelize.Op.between]: [start_date, end_date]}},
        order: [[sequelize.col('created_at'), 'DESC']], 
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return sale
}

sales.create = create
sales.findAllBetweenDates = findAllBetweenDates
sales.findOneById = findOneById
sales.destroy = destroy
sales.findAllBetweenDateGroupByDate = findAllBetweenDateGroupByDate
sales.findAllBetweenDateGroupByPayment = findAllBetweenDateGroupByPayment
sales.findAllBetweenDateGroupByDte = findAllBetweenDateGroupByDte


sales.find_all_by_month_and_year = find_all_by_month_and_year
sales.find_one_min_create = find_one_min_create
sales.find_all_by_date_range = find_all_by_date_range
sales.find_all_one_date = find_all_one_date



module.exports = sales