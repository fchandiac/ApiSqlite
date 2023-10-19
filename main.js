
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 3002
app.set('json spaces', 2)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors({ origin: '*' }))

app.use(require('./routes/taxes'))
app.use(require('./routes/categories'))
app.use(require('./routes/products'))
app.use(require('./routes/prices'))
// app.use(require('./routes/print'))
app.use(require('./routes/stocks'))
app.use(require('./routes/sales'))
app.use(require('./routes/users'))
app.use(require('./routes/profiles'))
app.use(require('./routes/salesDetails'))
app.use(require('./routes/customers'))
app.use(require('./routes/pays'))
app.use(require('./routes/orders'))
app.use(require('./routes/ordersDetails'))
app.use(require('./routes/partialPayments'))



// app.use(require('./routes/orders'))
// app.use(require('./routes/orders_details'))
// app.use(require('./routes/deliveries'))


app.get('/health', (req, res) => {
    res.json(true)
})




app.listen(port, () => {
    console.log('server work! at port: ' + port)
})

