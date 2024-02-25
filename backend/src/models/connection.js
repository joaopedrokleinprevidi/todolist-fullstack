// Todos os arquivos que lidam com banco de dados ficam dentro da pasta "MODEL"
const mysql = require("mysql2/promise");

require("dotenv").config();

//createConnection === cria uma conexão
//createPool === cria uma lista de conexões

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

module.exports = connection;
