import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routers';

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cors({ origin: true }));

// app.options('*', cors());

app.use('/auth', authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
