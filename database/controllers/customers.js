const { Customers } = require("../db");
const customers = {}

async function create(rut, name, activity, district, city, address) {
    const customer = await Customers.create({
        rut: rut,
        name: name,
        activity: activity,
        district: district,
        city: city,
        address: address
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })

    return customer

}

async function findAll() {
    const customers = await Customers.findAll().then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return customers

}

async function update(id, rut, name, activity, district, city, address) {
    const customer = await Customers.update(
        { rut: rut, name: name, activity: activity, district: district, city: city, address: address },
        { where: { id: id } }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return customer
}

async function destroy(id) {
    const customer = await Customers.destroy(
        { where: { id: id } }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return customer
}
async function findOneByRut(rut) {
    const customer = await Customers.findOne({ where: { rut: rut } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return customer
}

async function findOneById(id) {
    const customer = await Customers.findOne({ where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return customer
}

customers.create = create
customers.findAll = findAll
customers.update = update
customers.destroy = destroy
customers.findOneByRut = findOneByRut
customers.findOneById = findOneById

module.exports = customers