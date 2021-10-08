const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','theo123doro',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;