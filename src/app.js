import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routers';
import { setAsync, deleteAsync, keysAsync, getAsync } from './database/redis';

dotenv.config();

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', async function (socket) {

  try {
    const { id, type } = socket.handshake.query;

    if (type === 'delivery') {
      socket.join(id);

      socket.on('locationChange', async function ({ data }) {
        try {
          await setAsync(id, JSON.stringify({ ...data, id }));
          socket.in(id).broadcast.emit('updateLocation', { ...data });
        } catch (err) {
          console.log(err);
        }
      });

      // remove the user from redis after he disconnects
      socket.on('disconnect', () => {
        deleteAsync(id);
      });
    }

    if (type === 'manager') {
      const keys = await keysAsync('*');

      const keyValues = await Promise.all(keys.map(key => getAsync(key)));

      if (keyValues.length) {
        const parsedDelivery = JSON.parse(keyValues[0]);

        socket.join(parsedDelivery.id);

        socket.emit('joinedRoom', parsedDelivery);
      } else {
        socket.emit('joinedRoom', false);
      }
    }
  } catch (error) {
    console.log(error);
    // socket.disconnect();
  }
});

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cors({ origin: true }));

app.use('/auth', authRouter);

const port = process.env.PORT || 8000;

http.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
