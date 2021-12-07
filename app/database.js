const { Client } = require('pg');

const client = new Client({
    // connection database by the .env
    connectionString: process.env.DATABASE_URL,
    // need to deploy by heroku
    ssl: {
      rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;