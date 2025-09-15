const pool = require("../db/config");

async function register(username, passwordHash) {
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, passwordHash]
  );
  return result.rows[0];
}

async function findUserByUsername(username) {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
}

module.exports = { register, findUserByUsername };