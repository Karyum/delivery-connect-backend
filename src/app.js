import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routers';
import RedisDB, { setAsync } from './database/redis';
import { createClient } from 'redis';

const client = createClient();

dotenv.config();

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const deliveries = {
  1: {
    altitude: 72.79999542236328,
    heading: 0,
    longitude: 34.9916038,
    speed: 0,
    latitude: 32.8166318,
    accuracy: 13.876999855041504
  }
};

io.on('connection', function (socket) {
  console.log('conneted');
  // socket.disconnect();
  let id;

  try {
    id = socket.handshake.query.id;

    socket.on('locationChange', async function (location) {
      console.log('data incoming');
      console.log(1, location);
      // deliveries[id] = data;

      try {
        await setAsync(1, JSON.stringify(location.data));
        socket.broadcast.emit('mario', {
          ...location
        });
      } catch (err) {
        console.log('ZZZZZZZZZZZZZZZZZZZzz');
        console.log(err);
      }
    });
    // socket.emit('ping', {
    //   data: {
    //     data: location
    //   }
    // });
  } catch (error) {
    console.log(error);
    socket.disconnect();
  }

  // socket.on('disconnect', () => {
  //   delete deliveries[id];
  // });
});

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cors({ origin: true }));

app.use('/auth', authRouter);

const port = process.env.PORT || 8000;

http.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
