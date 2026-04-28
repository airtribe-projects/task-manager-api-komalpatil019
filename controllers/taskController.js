import tasks from "../data/tasks.js";

let id = 1;

// CREATE
export const createTask = (req, res) => {
  const { title, description, completed } = req.body;

  // Validation
  if (
    !title ||
    !description ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      error: "Invalid task data",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

// READ ALL
export const getTasks = (req, res) => {
  const { completed } = req.query;

  let filteredTasks = tasks;

  if (completed !== undefined) {
    filteredTasks = tasks.filter(
      (task) => task.completed === (completed === "true")
    );
  }

  res.json(filteredTasks);
};

// READ ONE
export const getTaskById = (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  res.status(200).json(task);
};

// UPDATE
export const updateTask = (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const { title, description, completed } = req.body;

  if (
    !title ||
    !description ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      error: "Invalid task data",
    });
  }

  task.title = title;
  task.description = description;
  task.completed = completed;

  res.status(200).json(task);
};

// DELETE
export const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const deletedTask = tasks.splice(index, 1);

  res.status(200).json(deletedTask[0]);
};