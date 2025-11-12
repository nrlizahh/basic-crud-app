const serverless = require('@vercel/node');
const app = require('../src/app'); // import Express app

module.exports = serverless(app);
