import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const db = pgPromise()({
  connectionString: process.env.DB_URL,
  ssl: process.env.NODE_ENV === 'production'
});

export default db;
