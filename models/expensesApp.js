const Sequelize = require('sequelize')

const sequelizeApp = require('../util/databaseApp')

const expensesApp = sequelizeApp.define('expenses', {
    id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
    },
    amount: Sequelize.INTEGER,
    description: Sequelize.STRING,
    category: Sequelize.STRING
})

module.exports = expensesApp