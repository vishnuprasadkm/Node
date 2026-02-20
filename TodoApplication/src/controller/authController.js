import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pool from "../config/dbConfig.js";

export const login = async (req, res, next) => {
  try {
    let userName = req.body.user_name;
    let password = req.body.password;

    let user = await pool.query("SELECT FROM users WHERE user_name=$1", [
      userName,
    ]);

    if (user.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "User not found!",
      });
    }

    user = user.rows[0];
    const validPass = bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.send(401).json({
        status: 401,
        message: "Unauthorized! Invalid Password!!",
      });
    }

    // JWT sign
    const token = jwt.sign(
      { id: user.user_id, role: user.role, userName: user.user_name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2hr" },
    );

    res.json({ message: "Logged in successfully", token: token });
  } catch (error) {
    next(error);
  }
};
