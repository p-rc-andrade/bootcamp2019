import { Router } from 'express';
// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Lucía Rodriguez',
//     email: 'luciarodriguez@gmail.com',
//     password_hash: '4657687u9133hrfqwde',
//   });

//   return res.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// authMiddleware as "global middleware"
// This will only work for all defined routes after this middleware
// routes.use(authMiddleware);

// With authMiddleware as "local middleware"
routes.put('/users', authMiddleware, UserController.update);

export default routes;
