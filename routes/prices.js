const express = require('express')
const prices = require('../database/controllers/prices')
const router = express.Router()

router.post('/prices/create', (req, res) => {
    prices.create(req.body.tax_id, req.body.sale, req.body.purchase).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/prices/findAll', (req, res) => {
    prices.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/prices/findById', (req, res) => {
    prices.finById(req.body.price_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router