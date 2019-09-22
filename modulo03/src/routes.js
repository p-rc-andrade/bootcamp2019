import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import {
  getSessionSchemaValidation,
  signUpUserSchemaValidation,
  updateUserSchemaValidation,
} from './app/middlewares/schemaValidation';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/test', (req, res) => {
  return res.send('test response');
});

// authMiddleware as "global middleware"
// This will only work for all defined routes after this middleware
// routes.use(authMiddleware);

// [GET] User Sign In / Get Access Token
routes.post('/sessions', getSessionSchemaValidation, SessionController.store);

// [POST] User Sign up
routes.post('/users', signUpUserSchemaValidation, UserController.store);

// [PUT] User Update
routes.put(
  '/users',
  updateUserSchemaValidation,
  authMiddleware,
  UserController.update
);

routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

export default routes;
