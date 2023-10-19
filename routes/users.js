const express = require('express')
const router = express.Router()
const users = require('../database/controllers/users')

router.post('/users/create', (req, res) => {
    users.create(req.body.user, req.body.name, req.body.pass, req.body.profile_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/users/findAll', (req, res) => {
    users.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/users/update', (req, res) => {
    users.update(req.body.id, req.body.user, req.body.name, req.body.pass, req.body.profile_id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/users/findOneById', (req, res) => {
    users.findOneById(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/users/destroy', (req, res) => {
    users.destroy(req.body.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/users/login', (req, res) => {
    users.findOneByUser(req.body.user)
        .then(data => {
            if (data.data == null) {
                res.json({ 'data': 'Usuario no existe' })
            } else {
                if (data.data.pass === req.body.pass) {
                    res.json(data)
                } else {
                    res.json({ 'data': 'Contraseña incorrecta' })
                }
            }
        })
        .catch(err => { res.json(err) })
})

router.post('/users/updatePass', (req, res) => {
    users.findOneById(req.body.id)
        .then(data => {
            if (data.data.pass === req.body.old_pass) {
                users.updatePass(req.body.id, req.body.new_pass)
                    .then(data => {
                        res.json(data)
                    })
                    .catch(err => res.json(err))
            } else {
                res.json({ 'data': 'Contraseña anterior incorrecta' })
            }
        })
        .catch(err => res.json(err))

})


module.exports = router
