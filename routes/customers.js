const express = require('express')
const router = express.Router()
const customers = require('../database/controllers/customers')

router.post('/customers/create', (req, res) => {
    customers.create(
        req.body.rut,
        req.body.name,
        req.body.activity,
        req.body.district,
        req.body.city,
        req.body.address
    ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/customers/findAll', (req, res) => {
    customers.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/customers/update', (req, res) => {
    customers.update(
        req.body.id,
        req.body.rut,
        req.body.name,
        req.body.activity,
        req.body.district,
        req.body.city,
        req.body.address
    ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/customers/destroy', (req, res) => {
    customers.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/customers/findOneByRut', (req, res) => {
    customers.findOneByRut(req.body.rut).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/customers/findOneById', (req, res) => {
    customers.findOneById(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/customers/destroy', (req, res) => {
    customers.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})




module.exports = router