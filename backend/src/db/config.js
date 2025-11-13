const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

const test = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("Koneksi berhasil:", res.rows[0]);
  } catch (error) {
    console.log("Koneksi gagal:", error);
  }
};

test();

module.exports = pool;
