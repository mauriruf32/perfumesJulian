import pg from 'pg';
// const { Pool } = require('pg')
import  Pool  from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, POSTGRES_URL, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } from './config.js';

export const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
});

// export const pool = new pg.Pool({
//   user: POSTGRES_USER,
//   host: POSTGRES_HOST,
//   password: POSTGRES_PASSWORD,
//   database: POSTGRES_DATABASE,
//   port: DB_PORT,
// });


// export const pool = new pg.Pool({
//     connectionString: process.env.POSTGRES_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });

// export const pool = new pg.Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });

// pool.query('SELECT NOW()').then(result => {
//     console.log(result)
// })

// pool.connect((err)=>{
//     if (err) throw err
//     console.log("conect succcess");
// })
