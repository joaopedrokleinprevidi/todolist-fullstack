const connection = require("./connection");

const getAll = async () => {
  //executa uma requisição ao banco de dados, para pegar todos os dados na tabela TASKS do mysql
  const tasks = await connection.execute("SELECT * FROM tasks");
  return tasks[0];
};

const createTask = async (tasks) => {
  const { titulo } = tasks;

  const dateUTC = new Date(Date.now()).toUTCString();

  const query =
    "INSERT INTO tasks(titulo, status, created_at) VALUES (?, ?, ?)";

  const [createdTask] = await connection.execute(query, [
    titulo,
    "pendente",
    dateUTC,
  ]);
  return { insertId: createdTask.insertId };
};

module.exports = {
  getAll,
  createTask,
};
