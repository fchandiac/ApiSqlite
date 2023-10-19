const express = require('express')
const router = express.Router()
const sales = require('../database/controllers/sales')

router.post('/sales/create', (req, res) => {
    sales.create(
        req.body.amount, 
        req.body.payment_method, 
        req.body.dte_code, 
        req.body.dte_number,
        req.body.stock_control,
        req.body.user_id
        ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/findOneById', (req,res) => {
    sales.findOneById(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/findAllBetweenDates', (req, res) => {
    sales.findAllBetweenDates(req.body.start, req.body.end).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/destroy', (req, res) => {
    sales.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/findAllBetweenDateGroupByDate', (req, res) => {
    sales.findAllBetweenDateGroupByDate(req.body.start, req.body.end).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/findAllBetweenDateGroupByPayment', (req, res) => {
    sales.findAllBetweenDateGroupByPayment(req.body.start, req.body.end).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/sales/findAllBetweenDateGroupByDte', (req, res) => {
    sales.findAllBetweenDateGroupByDte(req.body.start, req.body.end).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = router