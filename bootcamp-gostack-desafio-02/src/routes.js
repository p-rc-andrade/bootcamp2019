import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/test', (req, res) => {
  return res.send('test response');
});

// User Sign up
routes.post('/users', UserController.store);
// User Update
routes.put('/users', UserController.update);

export default routes;
