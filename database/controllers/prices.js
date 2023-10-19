const { Prices } = require("../db");
const prices = {}

async function create(tax_id, sale, purchase){
    const price = await Prices.create({
        tax_id: tax_id,
        sale: sale,
        purchase: purchase
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return price
}

async function findAll(){
    const prices = await Prices.findAll().then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return prices
}

async function finById(price_id){
    const price = await Prices.findOne().then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return price
}

prices.create = create
prices.findAll = findAll
prices.finById = finById
module.exports = prices