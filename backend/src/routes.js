const express = require("express");
const tasksController = require("./controllers/tasksController");
const tasksMiddleware = require("./middlewares/tasksMiddleware");

const router = express.Router();

router.get("/tasks", tasksController.getAll);
router.post("/tasks", tasksMiddleware.validateBody, tasksController.createTask);
//tasksMiddleware === verifica
//tasksController === faz req/res

// ou seja primeiro o middleware faz a requisição e depois prossegue. (next) para criar a task

router.delete("/tasks/:id", tasksController.deleteTask);
router.put(
  "/tasks/:id",
  tasksMiddleware.validateBody,
  tasksMiddleware.validateStatus,
  tasksController.updateTask
);

//agora aqui em PUT (atualizar):
//Validaremos os dois campos do nosso banco de dados
//no caso os dois campos que estariamos recebendo do front end
//seria o titulo, e o status
//se tudo ocorrer como esperado, atualiza

module.exports = router;
