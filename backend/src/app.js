//Normalmente em ambiente de produção existe este arquivo chamado "app", para ser realizado testes.

const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();
app.use(express.json());
app.use(cors()); //Aqui liberamos o acesso da API para TODOS ( qualquer um )
// Podemos passar uma série de parametros em CORS para configurar o acesso a api. Mas desta maneira feita acima qualquer um pode ter acesso.
//Como é um exemplo, será feito desta maneira. (Zero Segurança)
app.use(router);

module.exports = app;
