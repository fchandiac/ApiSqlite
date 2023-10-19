const express = require('express')
const router = express.Router()
const escpos = require('escpos')
const moment = require('moment')
escpos.USB = require('escpos-usb')


const id_vendor = 1155
const id_product = 22339




router.post('/print/ticket', (req, res) => {
    ticket(req.body.total, req.body.cart)
        .then(() => {
            res.json({ status: 'success' })
        }).catch(err => {
            console.log(err)
            res.json(err)
        })
})

function ticket(total, cart) {
    const print = new Promise((resolve, reject) => {
        try {
            const device = new escpos.USB(id_vendor, id_product)
            const options = { encoding: "GB18030" /* default */ }
            const printer = new escpos.Printer(device, options)
            device.open(function (error) {
                printer.font('b').align('ct').size(0, 0).style('NORMAL')
                printer.text('TICKET')
                printer.text('_________________________________________')
                printer.tableCustom([
                    { text: '#', align: "LEFT", width: 0.1 },
                    { text: 'Producto', align: "LEFT", width: 0.8 },
                    { text: 'Subtotal', align: "LEFT", width: 0.2 }
                ])

                cart.map(product => {
                    printer.tableCustom([
                        { text: product.quanty, align: "LEFT", width: 0.1 },
                        { text: product.name, align: "LEFT", width: 0.8 },
                        { text: renderMoneystr(product.subTotal), align: "LEFT", width: 0.2 }
                    ])
                })

                printer.text('TOTAL: ' + renderMoneystr(total))
                printer.text('')
                let today = new Date()
                let date = moment(today).format('DD-MM-yyyy')
                let time = moment(today).format('HH:mm:ss')
                let date_line = 'fecha: ' + date + ' hora: ' + time
                printer.text(date_line)
                printer.text('')
                printer.cut()
                printer.cashdraw(2)
                printer.close()
            })
            resolve({ 'code': 1, 'data': 'success' })

        } catch (err) {
            reject({ 'code': 0, 'data': err })
        }
    })
    return print
}

function renderMoneystr(value) {
    if (value < 0) {
        value = value.toString()
        value = value.replace(/[^0-9]/g, '')
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        value = '$ -' + value
        return value
    } else {
        value = value.toString()
        value = value.replace(/[^0-9]/g, '')
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        value = '$ ' + value
        return value
    }
}


module.exports = router