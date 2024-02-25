const express = require("express");
const tasksController = require("./controllers/tasksController");
const tasksMiddleware = require("./middlewares/tasksMiddleware");

const router = express.Router();

router.get("/tasks", tasksController.getAll);
router.post("/tasks", tasksMiddleware.validateBody, tasksController.createTask);
//tasksMiddleware === verifica
//tasksController === faz req/res

// ou seja primeiro o middleware faz a requisição e depois prossegue. (next) para criar a task

module.exports = router;
