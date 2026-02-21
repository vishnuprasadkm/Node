import express from "express";

import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { userRegisterSchema, userUpdateSchema } from "../schema/userSchema.js";

const router = express.Router();

router.post("/", validateMiddleware(userRegisterSchema), createUser);
router.get("/", authenticateToken, getUser);
router.get("/:id", authenticateToken, getUserById);
router.put(
  "/:id",
  authenticateToken,
  validateMiddleware(userUpdateSchema),
  updateUser,
);
router.put(
  "/",
  authenticateToken,
  validateMiddleware(userUpdateSchema),
  updateUser,
);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
