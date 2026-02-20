import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production" ? ".prod.env" : ".dev.env";
dotenv.config({ path: envFile });

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_URL,
  ssl: false,
};
const pool = new Pool(config);

pool.on("connect", () => {
  console.log("Connection pool established with database");
});

export default pool;
