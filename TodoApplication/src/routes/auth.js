import express from "express";

import { login as loginRoute } from "../controller/authController.js";
import { createUser as registerRoute } from "../controller/userController.js";
import validate from "../middlewares/validateMiddleware.js";
import { userLoginSchema, userRegisterSchema } from "../schema/userSchema.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.status(403).json({
    status: 403,
    message: "This endpoint only accepts POST request",
    path: req.originalUrl,
    method: req.method,
  });
});
router.post("/login", validate(userLoginSchema), loginRoute);

router.get("/register", (req, res) => {
  res.status(403).json({
    status: 403,
    message: "This endpoint only accepts POST request",
    path: req.originalUrl,
    method: req.method,
  });
});
router.post("/register", validate(userRegisterSchema), registerRoute);

export default router;
