const express = require("express");
const app = express();

app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("exibindoHtmlComEjs");
});

app.listen(4000,()=>{console.log("App rodando");});

