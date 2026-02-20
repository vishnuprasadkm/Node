import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controller/todoController.js";
import authenticateToken from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/",authenticateToken, createTodo);
router.get("/", authenticateToken, getAllTodos);
router.get("/:id", authenticateToken, getTodoById);
router.put("/:id", authenticateToken, updateTodo);
router.delete("/:id", authenticateToken, deleteTodo);

export default router;
