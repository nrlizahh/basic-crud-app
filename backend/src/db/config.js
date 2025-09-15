const { Pool } = require('pg')

const pool = new Pool({
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME,
    idleTimeoutMillis : 500
})

// let test = async() => {
//     try {
//         console.log(await pool.query('SELECT NOW()'))
//     } catch (error) {
//         console.log("error");
//     }
// }

// test()

module.exports = pool