const express = require('express')
const taxes = require('../database/controllers/taxes')
const router = express.Router()

router.post('/taxes/create', (req, res) => {
    taxes.create(req.body.name, req.body.value).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/taxes/findAll', (req, res) => {
    taxes.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/taxes/update', (req, res) => {
    taxes.update(req.body.id, req.body.name, req.body.value).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/taxes/findOneById', (req, res) => {
    taxes.findOneById(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



module.exports = router