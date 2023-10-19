const { OrdersDetails, Products, Prices } = require('../db')
const sequelize = require('sequelize')
const orders_details = {}

async function create(order_id, product_id, quanty, sale,  discount, subtotal, name, affected) {
    const detail = await OrdersDetails.create({
        order_id: order_id,
        product_id: product_id,
        quanty: quanty,
        sale: sale,
        discount: discount,
        subtotal: subtotal,
        name: name,
        affected: affected
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})

    return detail
}

async function findAllByOrder(order_id){
    const details = await OrdersDetails.findAll({
        include: {model:Products, include:[Prices]},
        where: {order_id: order_id}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return details
}

// async function find_all_by_table_open(table){
//     const details = await OrdersDetails.findAll({
//         where: {table: table, status: 0}
//     }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
//     return details
// }

orders_details.create = create
orders_details.findAllByOrder = findAllByOrder


module.exports = orders_details