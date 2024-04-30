require('dotenv').config();
const { Pool }  = require('pg');
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env;

const pool = new Pool ({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
      require: true,
    },
})

pool.connect()
    .then(() => {
        console.log ("[v] Database connected");
    })
    .catch((err) => {
        console.log ("[x] Database connection failed\n" + err);
    })

module.exports = pool;