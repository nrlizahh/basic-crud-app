const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME,
    ssl: {
    require: true,
    rejectUnauthorized: false, 
  },
})

let test = async() => {
    try {
        const res = await pool.query('SELECT NOW()')
        console.log("Koneksi berhasil:", res.rows[0])
    } catch (error) {
        console.log("Koneksi gagal:", error)
    }
}

test()

module.exports = pool