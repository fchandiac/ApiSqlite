const express = require('express')
const products = require('../database/controllers/products')
const router = express.Router()


router.post('/products/create', (req, res) => {
    products.create(req.body.name, req.body.code, req.body.sale, req.body.purchase, req.body.category_id, req.body.tax_id, req.body.affected).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/updateFull', (req, res) => {
    products.updateFull(
        req.body.id, 
        req.body.name,
        req.body.code, 
        req.body.category_id, 
        req.body.tax_id, 
        req.body.sale, 
        req.body.purchase,
        req.body.affected
    ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/update_no_price', (req, res) => {
    products.update_no_price(
        req.body.id, 
        req.body.name,
        req.body.code, 
        req.body.ategory_id, 
        req.body.tax_id, 
        req.body.sale, purchase
    ).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/products/findAll', (req, res) => {
    products.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/destroy', (req, res) => {
    products.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/findOneByName', (req, res) => {
    products.findOneByName(req.body.name).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/findOneById', (req, res) => {
    products.findOneById(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/findOneByCode', (req, res) => {
    products.findOneByCode(req.body.code).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/find_all_by_code', (req, res) => {
    products.find_all_by_code(req.body.code).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/products/find_all_favorites', (req, res) => {
    products.find_all_favorites().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/updateFavorite', (req, res) => {
    products.updateFavorite(req.body.id, req.body.favorite).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/update_ticket', (req, res) => {
    products.update_ticket(req.body.id, req.body.ticket).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/products/updateStockControl', (req, res) => {
    products.updateStockControl(req.body.id, req.body.stock_control).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})



module.exports = router