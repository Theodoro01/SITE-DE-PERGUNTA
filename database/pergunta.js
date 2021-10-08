const Sequelize = require("sequelize");
const connection = require("./database");

//Criação de tabela
const pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false 
    }
});
/*Sincronização com o banco de dados
OBS: Se caso não exista uma tabela chamada "pergunta"
será automaticamente criada.
force: False - Não forçara a criação se caso a tabela ja exista.*/
pergunta.sync({force: false}).then(()=>{});

module.exports = pergunta;