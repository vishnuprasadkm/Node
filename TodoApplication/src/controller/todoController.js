import {
  createTodoService,
  deleteTodoService,
  getAllTodosService,
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
    if (!req.user.id || !req.user.userName) {
      return handleTodoResponse(res, 401, "Unauthorized! Please login.");
    }
    if (req.user.role == null) {
      return handleTodoResponse(res, 403, "Unauthorized!");
    }
    const todo = await createTodoService(req.body, req.user);
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
    if (!req.user.id || !req.user.userName) {
      return handleTodoResponse(res, 401, "Unauthorized! Please login.");
    }
    if (req.user.role !== "admin") {
      const todo = await getAllUsersTodosService(req.user.id);
      return handleTodoResponse(
        res,
        200,
        "Todo fetched successfully!",
        todo.size,
        todo.data,
      );
    }
    const todo = await getAllTodosService();
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
    if (!req.user.id || !req.user.userName) {
      return handleTodoResponse(res, 401, "Unauthorized! Please login.");
    }
    const todo = await getTodoService(req.params.id);
    if (todo.data.user_id !== req.user.id && req.user.role !== "admin") {
      return handleTodoResponse(
        res,
        403,
        "Forbidden: You don't have access to this todo.",
      );
    }

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
    if (!req.user.id || !req.user.userName) {
      return handleTodoResponse(res, 401, "Unauthorized! Please login.");
    }
    const todo = await updateTodoService(req.body, req.params.id);
    if (todo.data.user_id !== req.user.id && req.user.role !== "admin") {
      return handleTodoResponse(
        res,
        403,
        "Forbidden: You don't have access to this todo.",
      );
    }
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
    if (!req.user.id || !req.user.userName) {
      return handleTodoResponse(res, 401, "Unauthorized! Please login.");
    }
    const todo = await deleteTodoService(req.params.id);
    if (todo.data.user_id !== req.user.id && req.user.role !== "admin") {
      return handleTodoResponse(
        res,
        403,
        "Forbidden: You don't have access to this todo.",
      );
    }
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
