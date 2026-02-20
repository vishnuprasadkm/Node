import pool from "./dbConfig.js";

// const
export default async function createDataBase() {
  try {
    // Check for Users table if not create one
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            user_name VARCHAR(20) UNIQUE NOT NULL,
            email VARCHAR(50) NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            password VARCHAR(50) NOT NULL,
            active BOOLEAN DEFAULT true,
            role VARCHAR(20) DEFAULT 'user'
            );`);

    const userTableResponse = await pool.query(
      "SELECT to_regclass('public.users') AS table_name",
    );
    // If user table does not exist drop Todos table
    if (userTableResponse?.rows?.[0].table_name === null) {
      pool.query("DROP TABLE IF EXISTS todos;");
      console.log("Todo table dropped due to missing user table");
    }
    // Check for Todo table  if not create one
    await pool.query(`CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        title VARCHAR(80) NOT NULL,
        description VARCHAR(80),
        priority SMALLINT,
        complete BOOLEAN DEFAULT false,
        user_id INT REFERENCES users(id) ON DELETE CASCADE
        )`);
  } catch (err) {
    throw new Error("Something went wrong" + err.message);
  }
}

export async function dropTable(drop) {
  if (drop) {
    // Dropping todo 1st because it has dependent on user table for foreign key
    pool.query("DROP TABLE IF EXISTS todos");
    pool.query("DROP TABLE IF EXISTS users");

    console.log("users and todo Table is dropped");
  }
}
