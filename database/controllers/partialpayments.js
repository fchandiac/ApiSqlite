const { PartialPayments } = require('../db')
const partialpayments = {}

async function create(amount, detail, user_id, customer_id) {
    const partialpayment = await PartialPayments.create({
        amount: amount,
        detail: detail,
        user_id: user_id,
        customer_id: customer_id
    }).then(data => { return { 'code': 1, 'data': data } }).catch(err => { return { 'code': 0, 'data': err } })

    return partialpayment

}

async function findAllByPay(pay_id) {
    const partialpayments = await PartialPayments.findAll()
        .then(res => {
            let filtered = []
            let plane = []
            res.forEach(item => {
                item.detail.forEach(detailItem => {
                    const newItem = {
                        id: item.id,
                        amount: item.amount,
                        user_id: item.user_id,
                        customer_id: item.customer_id,
                        pay_id: detailItem.pay_id,
                        amount_detail: detailItem.amount,
                        created_at: item.createdAt,
                    }
                    plane.push(newItem)
                })
            })

            filtered = plane.filter(item => item.pay_id == pay_id)
            return { 'code': 1, 'data': filtered } 

        }).catch(err => { return { 'code': 0, 'data': err } })

        return partialpayments
}

// [
//     {
//         id: 1,
//         amount: 100,
//         detail: [{ pay_id: 1, amount: 50 }, { pay_id: 2, amount: 50 }],
//     },
//     {
//         id: 2,
//         amount: 100,
//         detail: [{ pay_id: 1, amount: 50 }, { pay_id: 2, amount: 50 }],
//     },
// ]
partialpayments.create = create
partialpayments.findAllByPay = findAllByPay

module.exports = partialpayments