const express = require('express')
const router = express.Router()
const partialpayments = require('../database/controllers/partialpayments')

router.post('/partialpayments/create', (req, res) => {
    partialpayments.create(req.body.amount, req.body.detail, req.body.user_id, req.body.customer_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/partialpayments/findAllByPay', (req, res) => {
    partialpayments.findAllByPay(req.body.pay_id).then(data => {
        console.log(data)
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



module.exports = router
