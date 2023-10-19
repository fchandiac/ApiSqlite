const { Pays } = require('../db')
const pays = {}
const sequelize = require('sequelize')

async function create(sale_id, customer_id, amount, payment_method, state, date, paid, balance) {
    const pay = await Pays.create({
        sale_id: sale_id,
        customer_id: customer_id,
        amount: amount,
        payment_method: payment_method,
        state: state,
        date: date,
        paid: paid,
        balance: balance
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })

    return pay
}

async function findAll() {
    const pays = await Pays.findAll(
        { order: [['state', 'ASC']] }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return pays
}


async function updateState(id, state) {
    const pay = await Pays.update(
        { state: state },
        { where: { id: id } }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return pay
}

async function addPaid(id, paid) {
    const pay = await Pays.findOne({ where: { id: id } })
    let newPaid = pay.paid + paid
    let newBalance = pay.balance - paid
    let state = newBalance == 0 ? true : false
    const pay2 = await Pays.update({
        paid: newPaid,
        balance: newBalance,
        state: state
    }, { where: { id: id } })
    if (pay2[0] == 1) {
        const pay3 = await Pays.findOne({ where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
        return pay3
    } else {
        return { 'code': 0, 'data': err }
    }
 
}

async function destroy(id) {
    const pay = await Pays.destroy(
        { where: { id: id } }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return pay
}

async function findAllBetweenDates(start, end) {
    const pays = await Pays.findAll(
        {
            where: { createdAt: { [sequelize.Op.between]: [start, end] } },
            order: [['state', 'ASC'], ['createdAt', 'DESC']]
        }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return pays
}

async function findAllByCustomerId(customer_id) {
    const pay = await Pays.findAll(
        { 
            where: { customer_id: customer_id },
            order: [['state', 'ASC'], ['createdAt', 'DESC']]
        }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return pay
}

pays.create = create
pays.findAll = findAll
pays.updateState = updateState
pays.destroy = destroy
pays.findAllBetweenDates = findAllBetweenDates
pays.findAllByCustomerId = findAllByCustomerId
pays.addPaid = addPaid

module.exports = pays