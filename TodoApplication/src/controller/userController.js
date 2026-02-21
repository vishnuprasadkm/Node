import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserDetailService,
  updateUserService,
} from "../models/userModel.js";

const handleUserResponse = (res, status, message, size = 0, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
    size,
  });
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await createUserService(req.body);
    handleUserResponse(
      res,
      201,
      "User created successfully!",
      newUser.size,
      newUser.data,
    );
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user =
      req.user.role !== "admin"
        ? await getUserDetailService(req.user.id)
        : await getAllUsersService();

    if (user.size == 0) {
      return req.user.role !== "admin"
        ? handleUserResponse(res, 403, "Access Denied!")
        : handleUserResponse(res, 404, "User not found!");
    }
    handleUserResponse(
      res,
      200,
      "User fetched successfully!",
      user.size,
      user.data,
    );
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && +req.params.id !== +req.user.id) {
      return handleUserResponse(
        res,
        403,
        "Forbidden: User access not allowed!",
      );
    }
    const user =
      req.user.role === "admin"
        ? await getUserDetailService(req.params.id)
        : await getUserDetailService(req.user.id);
    if (user.size == 0) {
      return handleUserResponse(res, 404, "User not found!");
    }
    handleUserResponse(
      res,
      200,
      "User fetched successfully!",
      user.size,
      user.data,
    );
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    let user = {};
    if (req.user.role === "admin") {
      if (req.params.id) {
        user = await updateUserService(req.body, req.params.id);
      } else user = await updateUserService(req.body, req.user.id);
    } else {
      if (+req.params.id === +req.user.id) {
        user = await updateUserService(req.body, req.user.id);
      } else
        return handleUserResponse(
          res,
          403,
          "Forbidden: User action not allowed!",
        );
    }
    if (user.size == 0) {
      return handleUserResponse(res, 404, "User not found!");
    }
    handleUserResponse(
      res,
      200,
      "User updated successfully!",
      user.size,
      user.data,
    );
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      const user = await deleteUserService(req.user.id);
      return handleUserResponse(
        res,
        200,
        "User deleted successfully!",
        user.size,
        user.data,
      );
    }
    const user = await deleteUserService(req.params.id);
    if (user.size == 0) {
      return handleUserResponse(res, 404, "User not found!");
    }
    handleUserResponse(
      res,
      200,
      "User deleted successfully!",
      user.size,
      user.data,
    );
  } catch (error) {
    next(error);
  }
};

export {
  handleUserResponse,
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
