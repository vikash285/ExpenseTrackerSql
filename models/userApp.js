const Sequelize = require('sequelize')

const sequelizeApp = require('../util/databaseApp')

const UserApp = sequelizeApp.define('userApp', {
    id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    isPremiumUser: Sequelize.BOOLEAN,
    totalExpenses: Sequelize.INTEGER
})

module.exports = UserApp