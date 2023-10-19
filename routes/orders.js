const express = require('express')
const router = express.Router()
const orders = require('../database/controllers/orders')


router.get('/orders/create', (req, res) => {
    orders.create().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/create_delivery', (req, res) => {
    orders.create_delivery(req.body.note).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/orders/findAll', (req, res) => {
    orders.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/findOneById', (req, res) => {
    orders.findOneById(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/destroy', (req, res) => {
    orders.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/updateState', (req,res) => {
    orders.updateState(req.body.id, req.body.state).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


router.post('/orders/update_printed', (req,res) => {
    orders.update_state(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
router.get('/orders/destroy_close_orders', (req, res) => {
    orders.destroy_close_orders().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/destroy_past_orders', (req, res) => {
    orders.destroy_past_orders(req.body.today).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/update_table', (req,res) => {
    orders.update_table(req.body.id, req.body.table).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/orders/find_all_by_table_open', (req, res) => {
    orders.find_all_by_table_open(req.body.table).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = router