import { Router } from 'express';
// import User from './app/models/User';
import UserController from './app/controllers/UserController';

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

export default routes;
