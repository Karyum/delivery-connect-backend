import dotenv from 'dotenv';
import { Pool } from 'pg';
import { parse } from 'url';
dotenv.config();

if (!process.env.DB_URL) {
  throw new Error('Environment variable DATABASE_URL must be set');
}

const params = parse(process.env.DB_URL);

const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2
};

if (username) {
  options.user = username;
}
if (password) {
  options.password = password;
}

options.ssl = options.host !== 'localhost';

export default new Pool(options);
