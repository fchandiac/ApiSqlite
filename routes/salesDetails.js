const express = require('express')
const router = express.Router()
const sales_detail = require('../database/controllers/salesDetails')


router.post('/salesDetails/create', (req, res) => {
    sales_detail.create(
        req.body.sale_id, 
        req.body.product_id, 
        req.body.quanty, 
        req.body.sale,  
        req.body.discount, 
        req.body.subtotal, 
        req.body.name
        ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/salesDetails/findAllBySale', (req, res) => {
    sales_detail.findAllBySale(req.body.sale_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



router.post('/salesDetails/findAllBetweenDateGroupByProduct', (req, res) => {
    sales_detail.findAllBetweenDateGroupByProduct(req.body.start, req.body.end).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



module.exports = router