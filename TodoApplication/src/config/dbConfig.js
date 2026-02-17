import Pool from "pg";

const config = {
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_URL,
  ssl: true,
};
const pool = new Pool(config);
export default pool;
