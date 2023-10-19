const express = require('express')
const stocks = require('../database/controllers/stocks')
const storages = require('../database/controllers/storages')
const router = express.Router()


router.post('/stocks/create', (req, res) => {
    stocks.create(req.body.product_id, req.body.storage_id , req.body.stock, req.body.critical_stock).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



router.post('/stocks/findAllByProductId', (req, res) => {
    stocks.findAllByProductId(req.body.product_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/stocks/update', (req, res) => {
    stocks.update(req.body.id, req.body.room, req.body.warehouse).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
router.post('/stocks/update_room', (req, res) => {
    stocks.update_room(req.body.id, req.body.room).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
router.post('/stocks/destroy', (req, res) => {
    stocks.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/stocks/findAll', (req, res) => {
    stocks.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/storages/findAll', (req, res) => {
    storages.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/storages/create', (req, res) => {
    storages.create(req.body.name).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


router.post('/stocks/updateByProductAndStorage', (req, res) => {
    stocks.updateByProductAndStorage(req.body.product_id, req.body.storage_id, req.body.stock, req.body.critical_stock).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/stocks/findAllGroupByProduct', (req, res) => {
    stocks.findAllGroupByProduct().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/stocks/findOneByProductAndStorage', (req, res) => {
    stocks.findOneByProductAndStorage(req.body.product_id, req.body.storage_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/stocks/findAllByStorage', (req, res) => {
    stocks.findAllByStorage(req.body.storage_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/stocks/findAllGroupByStorage', (req, res) => {
    stocks.findAllGroupByStorage().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/stocks/findAllStockAlert', (req, res) => {
    stocks.findAllStockAlert().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = router