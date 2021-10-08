const express = require("express");
const app = express();

app.set('view engine','ejs'); 

app.get("/:nome/:lang", (req,res)=>{
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome: "agua",preco:2.50},
        {nome: "pão",preco:1},
        {nome:"nescau",preco:5},
        {nome:"tomate",preco:9}
    ]

    res.render("exibindoVarComEjs.ejs", {
        nome: nome,
        lang: lang,
        empresa: "Fender",
        inscritos: 5000,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(3000,()=>{console.log("app rodando");});