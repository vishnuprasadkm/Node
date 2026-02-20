import express from "express";

import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", authenticateToken, getUser);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
