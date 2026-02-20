import express from "express";
import authRoute from "./auth.js"
import userRoute from "./user.js";
import todoRoute from "./todo.js";

const router = express.Router();

router.use("/", authRoute)
router.use("/user", userRoute);
router.use("/todo", todoRoute);

export default router;
