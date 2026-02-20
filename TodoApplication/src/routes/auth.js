import express from "express";

import { login as loginRoute } from "../controller/authController";
import { createUser as registerRoute } from "../controller/userController";

const router = express.Router();

router.post("/login", loginRoute);
router.post("/register", registerRoute);

export default router;
