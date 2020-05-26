import { verify } from 'jsonwebtoken';
import User from '../models/User.model';

export default function (role, returnData = false) {
  return (req, res, next) => {
    const { token, deviceId } = req.body;

    if (!token || !deviceId) {
      return res.sendStatus(401).send({ status: 'error' });
    }

    verify(token, process.env.JWT_SECRET, async (err) => {
      try {
        if (err) {
          res.sendStatus(401);
        }

        const user = await User.findUserByDeviceId(deviceId);

        req.user = user[0];
        return returnData ? res.send({ id: user[0].id }) : next();
      } catch (err) {
        console.log(err);
        res.sendStatus(400);
      }
    });
  };
}
