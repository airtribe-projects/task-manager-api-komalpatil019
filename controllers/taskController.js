const tasks = require("../data/tasks");

// CREATE
const createTask = (req, res) => {
  const {
    title,
    description,
    completed,
    priority,
  } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed,
    priority: priority || "low",
    createdAt: new Date(),
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

// READ ALL
const getTasks = (req, res) => {
  let result = [...tasks];

  const { completed, sort } = req.query;

  // Filter by completion status
  if (completed !== undefined) {
    result = result.filter(
      (task) =>
        task.completed === (completed === "true")
    );
  }

  // Sort by creation date
  if (sort === "asc") {
    result.sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    );
  }

  if (sort === "desc") {
    result.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
  }

  res.status(200).json(result);
};

// READ BY ID
const getTaskById = (req, res) => {
  const taskId = Number(req.params.id);

  if (isNaN(taskId)) {
    return res.status(400).json({
      error: "Invalid task ID",
    });
  }

  const task = tasks.find(
    (t) => t.id === taskId
  );

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  res.status(200).json(task);
};

// READ BY PRIORITY
const getTasksByPriority = (req, res) => {
  const level = req.params.level;

  const allowedPriorities = [
    "low",
    "medium",
    "high",
  ];

  if (!allowedPriorities.includes(level)) {
    return res.status(400).json({
      error: "Invalid priority level",
    });
  }

  const filteredTasks = tasks.filter(
    (task) => task.priority === level
  );

  res.status(200).json(filteredTasks);
};

// UPDATE
const updateTask = (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find(
    (t) => t.id === taskId
  );

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const {
    title,
    description,
    completed,
    priority,
  } = req.body;

  task.title = title;
  task.description = description;
  task.completed = completed;

  if (priority !== undefined) {
    task.priority = priority;
  }

  res.status(200).json(task);
};

// DELETE
const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);

  const index = tasks.findIndex(
    (t) => t.id === taskId
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const deletedTask = tasks.splice(index, 1);

  res.status(200).json(deletedTask[0]);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  getTasksByPriority,
  updateTask,
  deleteTask,
};