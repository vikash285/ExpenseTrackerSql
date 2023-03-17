const ExpensesApp = require('../models/expensesApp')
const UserApp = require('../models/userApp')
const sequelizeApp = require('../util/databaseApp')
const FileUrl = require('../models/fileUrls')

const UserServices = require('../services/userAppServices')
const S3Services = require('../services/s3Services')

function isStringInvalid (string) {
    if (string === undefined || string.length === 0) {
        return true
    } else {
        return false
    }
}


exports.downloadExpense = async(req, res) => {
    try {
    const expenses = await UserServices.getExpenses(req)
    const stringifiedExpenses = JSON.stringify(expenses)

    const userAppId = req.userApp.id
    const fileName = `Expense${userAppId}/${new Date()}.txt`
    const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName)
    res.status(200).json({ fileURL, success: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({ fileURL: '', success: false, err: err })
    }
}

exports.postExpenses = async(req, res, next) => {
    const t = await sequelizeApp.transaction()
    try {
        const { amount, description, category } = req.body
        if (isStringInvalid(amount) || isStringInvalid(description) || isStringInvalid(category)) {
            return res.status(400).json({ err: 'Bad Parameters, Something is missing.'})
        }
        const data = await ExpensesApp.create({ amount, description, category, userAppId: req.userApp.id }, { transaction: t })
        const totalExpense = Number(req.userApp.totalExpenses) + Number(amount)
        await UserApp.update({
            totalExpenses: totalExpense
        }, {
            where: { id: req.userApp.id },
            transaction: t
        })
        await t.commit()
        return res.status(201).json({ userExpense: data, message: 'Expense Added!', success: true })
    } catch (err) {
        await t.rollback()
        return res.status(500).json({ message: err, success: false })
    }
}

exports.postFileUrls = async(req, res) => {
    try{
        const { url } = req.body
         const data = await FileUrl.create({ url, userAppId: req.userApp.id })
         return res.status(201).json({ fileURL: data, success: true })
    } catch (err) {
        return res.status(500).json({ message: err, success: false })
    }
}

exports.getFileUrls = async(req, res) => {
    try{
        const url = await FileUrl.findAll({ where: { userAppId: req.userApp.id }})
        return res.status(200).json({ allUrls: url })
    } catch (err) {
        return res.status(500).json({ message: err, success: false })
    }
}

exports.getExpenses = async(req, res, next) => {
    try {
        const data = await ExpensesApp.findAll({ where: { userAppId: req.userApp.id }})
        return res.status(200).json({ allExpenses: data })
    } catch (err) {
        return res.status(500).json({ message: err, success: false })
    }
}

exports.deleteExpense = async(req, res, next) => {
    try {
    const eId = req.params.id
    const eAmount = req.params.amount
    console.log(eId);
    console.log(eAmount);
    
    await ExpensesApp.destroy({ where: { id: eId, userAppId: req.userApp.id } })
    const totalExpense = Number(req.userApp.totalExpenses) - Number(eAmount)
    console.log(Number(req.userApp.totalExpenses));
    console.log(Number(eAmount));
    await UserApp.update({
        totalExpenses: totalExpense
    }, {
        where: { id: req.userApp.id }
    })
    return res.sendStatus(200)
    } catch (err) {
       return res.status(500).json({ message: err, success: false })
    }
}