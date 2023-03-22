const UserApp = require('../models/userApp')
const jwt = require('jsonwebtoken')

exports.authenticate = async(req, res, next) => {
    try {

        const token = req.header('Authorization')
        const user = jwt.verify(token, process.env.TOKEN_SECRET)

        const userApp = await UserApp.findByPk(user.userId)
        req.userApp = userApp
        next()
    } catch (err) {
       return res.status(401).json({ success: false })
    }
}