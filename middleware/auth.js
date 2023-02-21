const UserApp = require('../models/userApp')
const jwt = require('jsonwebtoken')

exports.authenticate = async(req, res, next) => {
    try {

        const token = req.header('Authorization')
        const user = jwt.verify(token, '896r7teyrsfcgio8946e5r67687yugfjh8i78665r')

        const userApp = await UserApp.findByPk(user.userAppId)
        req.userApp = userApp
        next()
    } catch (err) {
       return res.status(401).json({ success: false })
    }
}