const addForm = document.querySelector(".add-form");
const tbody = document.querySelector("tbody");
const inputTask = document.querySelector(".input-task");

const fetchTasks = async () => {
  const response = await fetch("http://localhost:3333/tasks");

  const tasks = await response.json();
  return tasks;
};

const addTask = async (event) => {
  event.preventDefault();

  const task = { titulo: inputTask.value };

  //chama end point
  await fetch("http://localhost:3333/tasks", {
    method: "post", //configura o método (post=enviar)
    headers: { "Content-Type": "application/json" }, //configura para poder transferir/receber json
    body: JSON.stringify(task),
  });

  loadTasks();
  inputTask.value = "";
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "delete",
  });

  loadTasks();
};

const updateTask = async ({ titulo, status, id }) => {
  console.log("executed");
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, status }),
  });
  console.log("finish");

  loadTasks();
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: "long", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", options);
  return date;
};

const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};

const createSelect = (value) => {
  const options = `
    <option value="pendente">Pendente</option>
    <option value="em andamento">Em andamento</option>
    <option value="concluida">Concluída</option>
    `;

  const select = createElement("select", "", options);

  select.value = value;

  return select;
};

const createRow = (task) => {
  const { id, titulo, status, created_at } = task;

  const tr = createElement("tr");
  const tdTitle = createElement("td", titulo);
  const tdCreatedAt = createElement("td", formatDate(created_at));
  const tdStatus = createElement("td");
  const tdActions = createElement("td");

  const select = createSelect(status);
  select.addEventListener("change", ({ target }) =>
    updateTask({ ...task, status: target.value })
  );

  const editButton = createElement(
    "button",
    "",
    ' <span class="material-symbols-outlined"> edit </span>'
  );
  editButton.classList.add("btn-action");

  const deleteButton = createElement(
    "button",
    "",
    ' <span class="material-symbols-outlined">delete</span>'
  );

  const editForm = createElement("form");
  const editInput = createElement("input");

  editInput.value = titulo;

  editForm.append(editInput);

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    updateTask({ id, titulo: editInput.value, status });
  });

  editButton.addEventListener("click", () => {
    tdTitle.innerText = "";
    tdTitle.append(editForm);
  });

  deleteButton.classList.add("btn-action");
  deleteButton.addEventListener("click", () => {
    deleteTask(id);
  });

  tdStatus.append(select);

  tdActions.append(editButton, deleteButton);
  tr.append(tdTitle, tdCreatedAt, tdStatus, tdActions);

  return tr;
};

const loadTasks = async () => {
  //Pega tarefas
  const tasks = await fetchTasks();

  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.append(tr);
  });
};

addForm.addEventListener("submit", addTask);

loadTasks();
