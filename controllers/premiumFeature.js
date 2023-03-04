const UserApp = require('../models/userApp')
const Expense = require('../models/expensesApp')
const sequelizeApp = require('../util/databaseApp')
const express = require('express')

exports.getUserLeaderBoard = async(req, res, next) => {
    try {
      const users = await UserApp.findAll()
      const expenses = await Expense.findAll()
      const userAggregatedExpenses = {}
      expenses.forEach((expense) => {
        if (userAggregatedExpenses[expense.userAppId]) {
            userAggregatedExpenses[expense.userAppId] += expense.amount
        } else {
            userAggregatedExpenses[expense.userAppId] = expense.amount
        }
      })
      var userLeaderBoardDetails = []
      users.forEach((user) => {
        userLeaderBoardDetails.push({ name: user.name, total_cost: userAggregatedExpenses[user.id] || 0 })
      })
      userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost)
      res.status(200).json(userLeaderBoardDetails)
    } catch (err) {
        res.status(500).json(err)
    }
}