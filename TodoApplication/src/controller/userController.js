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
    const user = await getAllUsersService();
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
    const user = await getUserDetailService(req.params.id);
    console.log(user);
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
    const user = await updateUserService(req.body, req.params.id);
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
    const user = await deleteUserService(req.body, req.params.id);
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

export { handleUserResponse, createUser, getUser, getUserById, updateUser, deleteUser };
