
const { Stocks, Products, Storages } = require("../db");
const stock = {}
const sequelize = require('sequelize')


async function create(product_id, storage_id, stock, critical_stock) {
    const stok = await Stocks.create({
        product_id: product_id,
        storage_id: storage_id,
        stock: stock,
        critical_stock: critical_stock
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stok
}

async function updateByProductAndStorage(product_id, storage_id, stock, critical_stock) {
    const stok = await Stocks.update({
        stock: stock,
        critical_stock: critical_stock
    },
        { where: { product_id: product_id, storage_id: storage_id } }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stok
}

async function findOneByProductAndStorage(product_id, storage_id) {
    const stok = await Stocks.findOne({
        where: { product_id: product_id, storage_id: storage_id }
    },
        { where: { product_id: product_id, storage_id: storage_id } }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stok
}

async function find_all() {
    const stock = await Stocks.findAll({
        include: Products
    }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

async function destroy(id) {
    const stock = await Stocks.destroy({ where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

async function update(id, room, warehouse) {
    const stock = await Stocks.update({
        room: room,
        warehouse: warehouse
    }, { where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

async function update_room(id, room) {
    const stock = await Stocks.update({
        room: room,
    }, { where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

async function findAllByProductId(product_id) {
    const stock = await Stocks.findAll({
        include: [{ model: Products }, { model: Storages }],
        where: { product_id: product_id }
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

async function findAllGroupByProduct() {
    const stock = await Stocks.findAll({
        include: [{ model: Products }],
        attributes: [
            'product_id',
            [
                sequelize.cast(
                    sequelize.literal('SUM(stock)'),
                    'INTEGER'
                ),
                'total_stock',
            ],
        ],
        group: ['product_id'],

    }
    ).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

async function findAllByStorage(storage_id) {
    const stock = await Stocks.findAll({
        include: [{ model: Products }, { model: Storages }],
        where: { storage_id: storage_id }
    }).then(data => {
        return { 'code': 1, 'data': data }
    })
        .catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

async function findAllGroupByStorage() {
    const stock = await Stocks.findAll({
        //include: [{ model: Products }, { model: Storages }],
        include: [{ model: Storages }],
        attributes: [
            'storage_id',
            [sequelize.literal('SUM(stock)'),'total_stock'],
            [sequelize.literal('Storage.name'), 'storage_name'],
            [sequelize.fn('COUNT', sequelize.col('stocks.product_id')), 'products_count'],
            // [sequelize.fn('SUM', sequelize.col('stocks.stock')), 'stock_total']
        ],
        group: ['storage_id']
    }).then(data => {
        return { 'code': 1, 'data': data }
    })
        .catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

async function findAllStockAlert() {
    const stock = await Stocks.findAll({
        include: [{ model: Products }, { model: Storages }],
        where: [
            { stock: { [sequelize.Op.lte]: sequelize.col('critical_stock') } },
            { critical_stock: { [sequelize.Op.gt]: 0 } }
        ]
    
    }).then(data => {
        return { 'code': 1, 'data': data }
    })
        .catch(err => { return { 'code': 0, 'data': err } })
    return stock
}

stock.create = create
stock.findAll = find_all
stock.destroy = destroy
stock.update = update
stock.update_room = update_room
stock.findAllGroupByProduct = findAllGroupByProduct
stock.findAllByProductId = findAllByProductId
stock.updateByProductAndStorage = updateByProductAndStorage
stock.findOneByProductAndStorage = findOneByProductAndStorage
stock.findAllByStorage = findAllByStorage
stock.findAllGroupByStorage = findAllGroupByStorage
stock.findAllStockAlert = findAllStockAlert
module.exports = stock