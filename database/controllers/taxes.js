const {Taxes} = require("../db");
const taxes = {}

//code = 1, representa promesa ejecutada
// code = 0, representa promesa rechazada

async function create(name, value){
    const tax = await Taxes.create({
            name: name,
            value: value
    }).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return tax
}

async function findAll(){
    const taxes =  await Taxes.findAll().then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return taxes
}

async function update(id, name, value){
    const tax = await Taxes.update(
        { name: name,
         value: value},
        { where: { id: id } }
    ).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return tax
}

async function findOneById(id){
    const tax = await Taxes.findOne({where:{id:id}}).then(data => { return {'code': 1, 'data':data}}).catch(err => {return {'code': 0, 'data':err}})
    return tax
}

taxes.create = create
taxes.update = update
taxes.findOneById = findOneById
taxes.findAll = findAll
module.exports = taxes