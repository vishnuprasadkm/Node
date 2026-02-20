import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production" ? ".prod.env" : ".dev.env";
dotenv.config({ path: envFile });

import pool from "./config/dbConfig.js";
import createDataBase, { dropTable } from "./config/initDb.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import router from "./routes/routes.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);

// Initialize Database
await createDataBase();

// Routes
app.get("/", async (_, res) => {
  const db = await pool
    .query("SELECT current_database();")
    .then((res) => (res ? res?.rows?.[0]?.current_database : false));
  res.send(
    db
      ? `Port Active and connected to ${db} Database`
      : `Failed to establish connection with Database`,
  );
});

app.use("/api", router);
// Error handling

// Server
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
