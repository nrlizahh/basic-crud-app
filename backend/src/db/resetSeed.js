const pool = require('./config');

async function resetSeed() {
  try {
    await pool.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE;');
    console.log('All products deleted ✅');

    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    console.log('All users deleted ✅');

    console.log('Database reset completed ✅');
  } catch (err) {
    console.error('Reset Seed Error:', err);
  } finally {
    pool.end();
  }
}

resetSeed();
