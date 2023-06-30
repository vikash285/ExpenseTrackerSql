const Razorpay = require('razorpay')
const Order = require('../models/orders')
const userController = require('./userApp')

exports.purchasePremium = async(req, res, next) => {
    try {
       var rzp = new Razorpay ({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
       })
       const amount = 2500

       rzp.orders.create({ amount, currency: "INR" }, async(err, order) => {
        if (err) {
            throw new Error(JSON.stringify(err))
        }
        await req.userApp.createOrder({ orderId: order.id, status: 'PENDING' })
            return res.status(201).json({ order, key_id: rzp.key_id })

       })
    } catch (err) {
        return res.status(403).json({ message: 'Something went wrong!', success: false })
    }
}

exports.updateTransactionStatus = async(req, res, next) => {
    try {
        const userId = req.userApp.id
       const { payment_id, order_id } = req.body
       const order = await Order.findOne({ where: {orderId: order_id }})
       const Promise1 = order.update({ paymentId: payment_id, status: 'SUCCESSFUL' })
       const Promise2 = req.userApp.update({ isPremiumUser: true })
       await Promise.all([ Promise1, Promise2 ])
            return res.status(202).json({ message: 'Transaction successful', success: true, token: userController.generateAccessToken(userId,undefined , true) })
    } catch (err) {
        return res.status(403).json({ message: 'Something went wrong!', success: false })
    }
}