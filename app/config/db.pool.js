const { Pool } = require('pg');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = new Pool ({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

const connectLoop = () => {
    pool.connect()
    .then(() => {
        console.log ("[v] Database connected");
    })
    .catch((err) => {
        console.log ("[x] Database connection failed\n" + err);
        setTimeout(connectLoop, 2000);
    })

} 

connectLoop();

module.exports = pool;