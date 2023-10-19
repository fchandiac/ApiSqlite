const { Profiles } = require('../db')
const sequelize = require('sequelize')
const profiles = {}

async function create (name, un_lock, config, products, users, accounting){
    const profile = await Profiles.create({
        name:name,
        un_lock:un_lock,
        config:config,
        products:products,
        users:users,
        accounting:accounting
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return profile
}

async function findAll() {
    const profiles = await Profiles.findAll({
        order: [[sequelize.col('id'), 'DESC']]
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return profiles
}

async function findOneById(id) {
    const profile = await Profiles.findOne({
        where: {id:id}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return profile
}

async function update(id, name, un_lock, config, products, users, accounting){
    const profile = await Profiles.update({
        name:name,
        un_lock:un_lock,
        config:config,
        products:products,
        users:users,
        accounting:accounting
    }, {where: {id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return profile
}

async function destroy(id){
    const profile = await Profiles.destroy({
        where: {id:id}
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return profile
}


profiles.create = create
profiles.findAll = findAll
profiles.findOneById = findOneById
profiles.update = update
profiles.destroy = destroy

module.exports = profiles