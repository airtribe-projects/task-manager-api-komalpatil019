import tasks from "../data/tasks.js";

let id = 1;

// CREATE
export const createTask = (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: id++,
    title,
    completed: completed || false,
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
  const task = tasks.find((t) => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

// UPDATE
export const updateTask = (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
};

// DELETE
export const deleteTask = (req, res) => {
  const index = tasks.findIndex((t) => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deleted = tasks.splice(index, 1);

  res.json(deleted[0]);
};