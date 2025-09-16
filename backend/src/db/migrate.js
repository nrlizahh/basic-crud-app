const pool = require("./config");

const migration = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        image_url TEXT,
        user_id INT REFERENCES users(id)
      );
    `);

    console.log("Migration sukses 🚀");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migration();
