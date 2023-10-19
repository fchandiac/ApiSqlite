const { Orders, OrdersDetails } = require('../db')
const sequelize = require('sequelize')
const orders = {}

async function create (){
    const order = await Orders.create({
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function create_delivery (note){
    const order = await Orders.create({
        note:note,
        delivery:true
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function findAll() {
    const orders = await Orders.findAll({
        include: {model:OrdersDetails},
        order: [[sequelize.col('Orders.id'), 'DESC']]
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return orders
} 


async function findOneById(id) {
    const order = await Orders.findOne({
        where: {id:id},
        include: {model:OrdersDetails}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function destroy(id){
    const order = await Orders.destroy({
        where: {id:id}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function updateState(id, state){
    const order = await Orders.update({
        state: state
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function update_printed(id){
    const order = await Orders.update({
        printed: true
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function update_table(id, table){
    const order = await Orders.update({
        table: table
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return order
}

async function destroy_close_orders(){
    const orders = await Orders.destroy({where: {state:true}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return orders
}

async function destroy_past_orders(today){
    const orders = await Orders.destroy({
        where: {
            created_at : {[sequelize.Op.lt]: today}
        }
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return orders
}

async function find_all_by_table_open(table){
    const details = await Orders.findAll({
        where: {table: table, state: 0}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return details
}

orders.create = create
orders.findAll = findAll
orders.updateState = updateState
orders.destroy = destroy
orders.findOneById = findOneById



module.exports = orders