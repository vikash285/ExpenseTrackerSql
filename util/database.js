const Sequelize = require('sequelize')

const sequelize = new Sequelize('node_complete', 'root', '1702@moM', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize