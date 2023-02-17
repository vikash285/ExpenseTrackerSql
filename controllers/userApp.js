const UserApp = require('../models/userApp')

exports.postUserApp = async(req, res, next) => {
    try {
    if (!req.body.name || !req.body.email || !req.body.password) {
        throw new Error('Fields are empty!')
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const data = await UserApp.create({ name: name, email: email, password: password })
    res.status(201).json({ newUserAppDetail: data })
} catch (err) {
    res.status(500).json({
        error: err
    })
}
}