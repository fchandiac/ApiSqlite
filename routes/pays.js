const express = require('express')
const router = express.Router()
const pays = require('../database/controllers/pays')
const partialpayments = require('../database/controllers/partialpayments')

router.post('/pays/create', (req, res) => {
    pays.create(
        req.body.sale_id, 
        req.body.customer_id, 
        req.body.amount, 
        req.body.payment_method, 
        req.body.state,
        req.body.date,
        req.body.paid,
        req.body.balance
        ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/pays/findAll', (req, res) => {
    pays.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


router.post('/pays/updateState', (req, res) => {
    pays.updateState(req.body.id, req.body.state).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/pays/destroy', (req, res) => {
    pays.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/pays/findAllBetweenDates', (req, res) => {
    pays.findAllBetweenDates(req.body.start, req.body.end).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/pays/findAllByCustomerId', (req, res) => {
    pays.findAllByCustomerId(req.body.customer_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/pays/addPaid', (req, res) => {
    pays.addPaid(req.body.id, req.body.paid).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router