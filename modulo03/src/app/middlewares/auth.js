import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.indexOf('Bearer ') === -1) {
    return res
      .status(401)
      .json({ message: 'Authorization Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // const decoded;
    // jwt.verify(token, authConfig.secret, (err, result) => {
    //   if(!err){
    //     decoded = result;
    //   }
    // });

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Add new variable as request variable.
    req.userId = decoded.id;
    console.log('User_Id: ', req.userId);

    // The request after this middleware wont be called if "next()" isn't here.
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};

// const middlewareTest = (req, res, next) => {

// }

// export default middlewareTest;
