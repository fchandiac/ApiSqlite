const express = require('express')
const ordersDetails = require('../database/controllers/ordersDetails')
const router = express.Router()

router.post('/ordersDetails/create', (req, res) => {
    ordersDetails.create(
        req.body.order_id,
        req.body.product_id,
        req.body.quanty,
        req.body.sale,
        req.body.discount,
        req.body.subtotal,
        req.body.name,
        req.body.affected
    ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders_details/findAllByOrder', (req, res) => {
    ordersDetails.findAllByOrder(req.body.order_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})





module.exports = router