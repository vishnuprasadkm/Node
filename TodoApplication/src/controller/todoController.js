import {
  createTodoService,
  deleteTodoService,
  getAllUsersTodosService,
  getTodoService,
  updateTodoService,
} from "../models/todoModel.js";

const handleTodoResponse = (res, status, message, size = 0, data = null) => {
  res.status(status).json({
    status,
    message,
    size,
    data,
  });
};
const createTodo = async (req, res, next) => {
  try {
    const todo = await createTodoService(req.body);
    handleTodoResponse(
      res,
      201,
      "Todo created successfully!",
      todo.size,
      todo.data,
    );
  } catch (error) {
    next(error);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const todo = await getAllUsersTodosService();
    handleTodoResponse(
      res,
      200,
      "Todo fetched successfully!",
      todo.size,
      todo.data,
    );
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const todo = await getTodoService(req.params.id);
    if (todo.size == 0) {
      return handleTodoResponse(res, 404, "Todo not found!");
    }
    handleTodoResponse(
      res,
      200,
      "Todo fetched successfully!",
      todo.size,
      todo.data,
    );
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const todo = await updateTodoService(req.body, req.params.id);
    if (todo.size == 0) {
      return handleTodoResponse(res, 404, "Todo not found!");
    }
    handleTodoResponse(
      res,
      200,
      "Todo updated successfully!",
      todo.size,
      todo.data,
    );
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await deleteTodoService(req.params.id);
    if (todo.size == 0) {
      return handleTodoResponse(res, 404, "Todo not found!");
    }
    handleTodoResponse(
      res,
      200,
      "Todo deleted successfully!",
      todo.size,
      todo.data,
    );
  } catch (error) {
    next(error);
  }
};

export { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo };
