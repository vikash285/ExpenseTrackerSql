const Expense = require('../models/expense')

exports.postExpense = async(req, res, next) => {
    try{
        const price = req.body.amount;
        const product = req.body.des;
        const category = req.body.category;

        const data = await Expense.create({ price: price, product: product, category: category })
        res.status(201).json({ newExpenseDetail: data })
    } catch (err) {
       res.status(500).json({
        error: err
       })
    }
}

exports.getExpenses = async(req, res, next) => {
    const expenses = await Expense.findAll()
    res.status(200).json({ allExpenses: expenses })
}

exports.deleteExpense = async(req, res, next) => {
    const eId = req.params.id
    await Expense.destroy({ where: { id: eId }})
    res.sendStatus(200)
}