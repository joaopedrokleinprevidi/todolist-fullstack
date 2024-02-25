//Normalmente em ambiente de produção existe este arquivo chamado "app", para ser realizado testes.

const express = require("express");
const router = require("./routes");

const app = express();
app.use(express.json());

app.use(router);

module.exports = app;
