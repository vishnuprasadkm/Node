import pool from "../config/dbConfig.js";

export async function getAllUsersTodosService(id) {
  const response = await pool.query("SELECT * FROM todos WHERE user_id=$1;", [
    id,
  ]);
  return { data: response.rows, size: response.rowCount };
}

export async function getAllTodosService() {
  const response = await pool.query("SELECT * FROM todos;");
  return { data: response.rows, size: response.rowCount };
}

export async function getTodoService(id) {
  const response = await pool.query("SELECT * FROM todos WHERE id=$1", [id]);
  return { data: response.rows[0], size: response.rowCount };
}

export async function createTodoService(todo, user) {
  const values = [
    todo.title,
    todo.description,
    todo.priority,
    todo.complete,
    user.id,
  ];
  const response = await pool.query(
    "INSERT INTO todos(title, description, priority, complete, user_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
    values,
  );
  return { data: response.rows[0], size: response.rowCount };
}

export async function updateTodoService(todo, id) {
  const values = [
    todo.title,
    todo.description,
    todo.priority,
    todo.complete,
    id,
  ];
  const response = await pool.query(
    `UPDATE todos 
      SET 
        title=COALESCE($1, title), 
        description=COALESCE($2, description), 
        priority=COALESCE($3, priority), 
        complete=COALESCE($4, complete)
    WHERE id=$8
    RETURNING *`,
    values,
  );
  return { data: response.rows[0], size: response.rowCount };
}

export async function deleteTodoService(id) {
  const response = await pool.query(
    "DELETE FROM todos WHERE id=$1 RETURNING *",
    [id],
  );
  return { data: response.rows[0], size: response.rowCount };
}
