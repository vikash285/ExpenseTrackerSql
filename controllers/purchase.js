const Razorpay = require('razorpay')
const Order = require('../models/orders')

exports.purchasePremium = async(req, res, next) => {
    try {
       var rzp = new Razorpay ({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
       })
       const amount = 2500

       rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
        if (err) {
            throw new Error(JSON.stringify(err))
        }
        req.userApp.createOrder({ orderId: order.id, status: 'PENDING' }).then( () => {
            return res.status(201).json({ order, key_id: rzp.key_id })
        }).catch( err => {
            throw new Error(err)
        })

       })
    } catch (err) {
        return res.status(403).json({ message: 'Something went wrong!', success: false })
    }
}

exports.updateTransactionStatus = async(req, res, next) => {
    try {
       const { payment_id, order_id } = req.body
       const order = await Order.findOne({ where: {orderId: order_id }})
       const Promise1 = order.update({ paymentId: payment_id, status: 'SUCCESSFUL' })
       const Promise2 = req.userApp.update({ isPremiumUser: true })
       Promise.all([ Promise1, Promise2 ]).then( () => {
            return res.status(202).json({ message: 'Transaction successful', success: true })
        }).catch( (err) => {
            throw new Error(err)
        })
    } catch (err) {
        return res.status(403).json({ message: 'Something went wrong!', success: false })
    }
}