const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByPriority,
} = require("../controllers/taskController");

const validateTask = require("../middleware/validate");

const router = express.Router();

router.get("/", getTasks);

router.get(
  "/priority/:level",
  getTasksByPriority
);

router.get("/:id", getTaskById);

router.post(
  "/",
  validateTask,
  createTask
);

router.put(
  "/:id",
  validateTask,
  updateTask
);

router.delete("/:id", deleteTask);

module.exports = router;