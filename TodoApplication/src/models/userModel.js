import bcrypt from "bcrypt";

import pool from "../config/dbConfig.js";

const normalizeToNull = (val) => (val === "" ? null : val);

export async function getAllUsersService() {
  const response = await pool.query("SELECT * FROM users;");
  return { data: response.rows, size: response.rowCount };
}

export async function getUserDetailService(id) {
  const response = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return { data: response.rows[0], size: response.rowCount };
}

export async function createUserService(user) {
  const hashedPassword = user.password ? bcrypt.hash(user.password, 10) : null;
  const values = [
    normalizeToNull(user.userName),
    normalizeToNull(user.email),
    normalizeToNull(user.firstName),
    normalizeToNull(user.lastName),
    hashedPassword,
    true,
    user.role == null ? "user" : user.role,
  ];
  const response = await pool.query(
    "INSERT INTO users(user_name, email, first_name, last_name, password, active, role) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    values,
  );
  return { data: response.rows[0], size: response.rowCount };
}

export async function updateUserService(user, id) {
  const hashedPassword = user.password ? bcrypt.hash(user.password, 10) : null;
  const values = [
    normalizeToNull(user.userName),
    normalizeToNull(user.email),
    normalizeToNull(user.firstName),
    normalizeToNull(user.lastName),
    hashedPassword,
    true,
    normalizeToNull(user.role),
    id,
  ];
  const response = await pool.query(
    `UPDATE users 
      SET 
        user_name=COALESCE($1, user_name), 
        email=COALESCE($2, email), 
        first_name=COALESCE($3, first_name), 
        last_name=COALESCE($4, last_name), 
        password=COALESCE($5, password), 
        active=COALESCE($6, active), 
        role=COALESCE($7, role)
    WHERE id=$8
    RETURNING *`,
    values,
  );
  return { data: response.rows[0], size: response.rowCount };
}

export async function deleteUserService(id) {
  const response = await pool.query(
    "DELETE FROM users WHERE id=$1 RETURNING *",
    [id],
  );
  return { data: response.rows[0], size: response.rowCount };
}
