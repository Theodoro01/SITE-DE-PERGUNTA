const Sequelize = require("sequelize");
const connection = require("./database");

// criação de tadela
const respostas = connection.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

respostas.sync({force: false}).then(()=>{});

module.exports = respostas;