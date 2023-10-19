const express = require('express')
const categories = require('../database/controllers/categories')
const router = express.Router()

router.post('/categories/create', (req, res) => {
    categories.create(req.body.name).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/categories/findAll', (req, res) => {
    categories.findAll()
    .then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/categories/update', (req, res) => {
    categories.update(req.body.id, req.body.name).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/categories/destroy', (req, res) => {
    categories.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router