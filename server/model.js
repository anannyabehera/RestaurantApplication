const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Resturant',
  password: 'manisha@143',
  port: 5432 // Default PostgreSQL port
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database at', res.rows[0].now);
    }
  });
module.exports = pool;
