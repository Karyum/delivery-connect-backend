import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: false }));

// app.use(
//   cors({
//     optionsSuccessStatus: 200,
//     credentials: true,
//     origin: process.env.ORIGIN.split(',')
//   })
// );
// app.options('*', cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
