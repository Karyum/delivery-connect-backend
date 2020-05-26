import pool from '../database/db_connection';

exports.findUser = (phone) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await pool.query(
        `SELECT role, device_id AS deviceId, phone, password
        FROM users 
        WHERE phone = $1`,
        [phone]
      );

      if (!data.length) {
        return reject(
          new Error({ status: 'error', message: 'user not found' })
        );
      }

      resolve(data[0]);
    } catch (error) {
      console.log('findUser Error', error);
      reject(
        new Error({ status: 'error', error, message: 'something went wrong' })
      );
    }
  });

exports.findUserByDeviceId = (deviceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await pool.query(
        'SELECT * FROM users WHERE device_id = $1',
        [deviceId]
      );

      if (!data.length) {
        return reject(
          new Error({ status: 'error', message: 'user not found' })
        );
      }

      resolve(data[0]);
    } catch (error) {
      reject(
        new Error({ status: 'error', error, message: 'something went wrong' })
      );
    }
  });
