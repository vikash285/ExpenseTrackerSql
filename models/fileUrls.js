const Sequelize = require('sequelize')
const sequelizeApp = require('../util/databaseApp')

const fileUrls = sequelizeApp.define('fileUrls', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: Sequelize.STRING
})

module.exports = fileUrls