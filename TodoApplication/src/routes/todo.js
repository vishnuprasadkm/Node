import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controller/todoController.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { todoSchema, updateTodoSchema } from "../schema/todoSchema.js";

const router = express.Router();

router.post("/", authenticateToken, validateMiddleware(todoSchema), createTodo);
router.get("/", authenticateToken, getAllTodos);
router.get("/:id", authenticateToken, getTodoById);
router.put(
  "/:id",
  authenticateToken,
  validateMiddleware(updateTodoSchema),
  updateTodo,
);
router.delete("/:id", authenticateToken, deleteTodo);

export default router;
