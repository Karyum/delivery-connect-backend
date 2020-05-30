import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routers';

dotenv.config();

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const deliveries = {};

io.on('connection', function (socket) {
  console.log('conneted');

  let id;

  try {
    id = socket.handshake.query.id;
  } catch (error) {
    socket.disconnect();
  }

  socket.on('locationChange', ({ data }) => {
    console.log('data incoming');
    // console.log(data);
    deliveries[id] = data;
  });

  socket.on('disconnect', () => {
    delete deliveries[id];
  });
});

// setInterval(() => {
//   io.emit('ping', { data: (new Date()) / 1 });
// }, 2000);

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cors({ origin: true }));

app.use('/auth', authRouter);

const port = process.env.PORT || 8000;

http.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
