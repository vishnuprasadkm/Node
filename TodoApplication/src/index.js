import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminRoute from "./routes/admin"
import authRoute from "./routes/auth"
import userRoute from "./routes/user"
import todoRoute from "./routes/todo"

const env = process.env.NODE_ENV === "production" ? ".prod.env" : ".dev.env";
dotenv.config({path: env});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Port Active");
});
app.use("/auth", authRoute)
app.use("/admin", adminRoute)
app.use("/user", userRoute)
app.use("/todo", todoRoute)
// Error handling

// Server
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
  setInterval(() => {
    console.log("active");
  }, 50000);
});
