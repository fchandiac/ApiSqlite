const { Users, Profiles } = require('../db')
const sequelize = require('sequelize')
const users = {}

async function create(user, name, pass, profile_id) {
    const user_ = await Users.create({
        user: user,
        name: name,
        pass: pass,
        profile_id: profile_id
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return user_
}

async function findAll() {
    const users = await Users.findAll({
        order: [[sequelize.col('Users.id'), 'DESC']],
        include: Profiles
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return users
}

async function findOneById(id) {
    const user = await Users.findOne({
        where: { id: id }
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return user
}

async function findOneByUser(user) {
    const user_ = await Users.findOne({
        where: { user: user },
        include: Profiles
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return user_
}
async function findOneByNames(name) {
    const user = await Users.findOne({
        where: { name: name }
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return user
}

async function update(id, user, name, pass, profile_id) {
    const user_ = await Users.update({
        user: user,
        name: name,
        pass: pass,
        profile_id: profile_id
    }, { where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return user_
}

async function destroy(id) {
    const user = await Users.destroy({
        where: { id: id }
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })
    return user
}

async function updatePass(id, new_pass){
    const user = await Users.update({
        pass: new_pass
    }, { where: { id: id } }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })

    return user
}



users.create = create
users.findAll = findAll
users.findOneById = findOneById
users.update = update
users.destroy = destroy,
users.findOneByUser = findOneByUser,
users.findOneByNames = findOneByNames
users.updatePass = updatePass

module.exports = users