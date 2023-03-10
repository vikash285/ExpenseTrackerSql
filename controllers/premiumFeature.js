const UserApp = require('../models/userApp')
const Expense = require('../models/expensesApp')
const sequelizeApp = require('../util/databaseApp')
const express = require('express')

exports.getUserLeaderBoard = async(req, res, next) => {
    try {
      const leaderBoardOfUsers = await UserApp.findAll({
        order: [['totalExpenses', 'DESC']]
      })
      res.status(200).json(leaderBoardOfUsers)
    } catch (err) {
        res.status(500).json(err)
    }
}