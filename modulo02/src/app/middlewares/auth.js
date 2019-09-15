import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.indexOf('Bearer ') === -1) {
    return res
      .status(401)
      .json({ message: 'Authorization Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  // [
  //   "Bearer",
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCw..."
  // ]

  try {
    // jwt.verify(token, secret, (err, result) => {});

    // promisify is an alternative to methods that use callbacks
    // (like jwt.verify). this returns a method so you put the parameters next.
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Add new variable as request variable.
    req.userId = decoded.id;

    // console.log(decoded);

    // The request after this middleware wont be
    // called if "next()" is not executed
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
