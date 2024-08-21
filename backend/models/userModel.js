const db = require("../config/db");

const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

const createUser = async (username, email, hashedPassword) => {
  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );
  return result;
};

const deleteUser = async (user_id) => {
  const [result] = await db.query("DELETE FROM users WHERE user_id=(?)", [
    user_id,
  ]);

  return result.affectedRows;
};

const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

module.exports = {
  findUserByEmail,
  createUser,
  deleteUser,
  getAllUsers
};
