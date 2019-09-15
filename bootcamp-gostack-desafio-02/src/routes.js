import { Router } from 'express';

const routes = new Router();

routes.get('/test', (req, res) => {
  return res.send('test response');
});

export default routes;
