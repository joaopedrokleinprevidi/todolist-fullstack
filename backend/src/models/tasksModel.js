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

const deleteTask = async (id) => {
  const removedTask = await connection.execute(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
  return removedTask;
};

const updateTask = async (id, task) => {
  const { titulo, status } = task;

  const query = "UPDATE tasks SET titulo = ?, status = ? WHERE id = ?";

  const [updatedTask] = await connection.execute(query, [titulo, status, id]);
  return updatedTask;
};
module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
