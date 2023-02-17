const Sequelize = require('sequelize')

const sequelizeApp = new Sequelize('expense', 'root', '1702@moM', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelizeApp