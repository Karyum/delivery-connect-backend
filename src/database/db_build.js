import { readFileSync } from 'fs';
import { join } from 'path';

import pool from './db_connection.js';

const sqlPath = join(__dirname, 'db_build.sql');
const sql = readFileSync(sqlPath).toString();

pool
  .query(sql)
  .then(() => {
    console.log('database created');
  })
  .catch((err) => {
    console.log(err, 'error');
  });

//   (err, result) => {
//   if (err) {
//     console.log(err, 'error');
//   } else {
//     console.log('database created');
//     pool.end(() => {
//       console.log('connection closed');
//     });
//   }
// });
