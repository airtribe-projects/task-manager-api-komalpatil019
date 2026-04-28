import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { validateTask } from "../middleware/validate.js";

const router = express.Router();

router.post("/", validateTask, createTask);
router.get("/",  getTasks);
router.get("/:id",  getTaskById);
router.put("/:id", validateTask, updateTask);
router.delete("/:id",  deleteTask);

export default router;