const {Storages} = require("../db");
const storages = {}

async function create(name){
    const store = await Storages.create({
        name: name
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
        
    return store
}

async function findAll(){
    const store =  await Storages.findAll().then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return store
}

storages.findAll = findAll
storages.create = create

module.exports = storages