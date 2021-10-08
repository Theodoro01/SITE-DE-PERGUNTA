const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/pergunta");
const respostas = require("./database/respostas")

//Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    });
//Estou dizendo para o express usar o ejs como view engine.
app.set('view engine','ejs');
app.use(express.static('public')); 

//boryParser


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/",(req,res)=>{
    pergunta.findAll({raw: true, order:[
        ['id','DESC'] //DESC- Decrescente  ASC- Crescente
    ]}).then(pergunta =>{
        res.render("index",{
            pergunta: pergunta,
            
        });
    });
    
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/salvarperguntas", (req,res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;
    pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){ // Pergunta encontrada

            respostas.findAll({

               where: {perguntaId: pergunta.id},
               order: [
                   ["id","DESC"]
               ]

            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{ // Pergunta não encontrada
            res.redirect("/");
        }
    });

});

app.post("/respostas", (req,res)=>{

    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    respostas.create({
        corpo: corpo,
        perguntaId: perguntaId

    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    });
});

app.listen(8080,()=>{console.log("App rodando!");});