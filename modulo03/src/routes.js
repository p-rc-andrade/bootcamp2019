import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middlewares/auth';
import {
  getSessionSchemaValidation,
  signUpUserSchemaValidation,
  updateUserSchemaValidation,
} from './app/middlewares/schemaValidation';

const routes = new Router();
const upload = multer(multerConfig);

// authMiddleware as "global middleware"
// This will only work for all defined routes after this middleware
// routes.use(authMiddleware);

// [POST] Sessions - store (Sign In / Get Access Token)
routes.post('/sessions', getSessionSchemaValidation, SessionController.store);

// [POST] Users - store (User Sign Up)
routes.post('/users', signUpUserSchemaValidation, UserController.store);

// Authorization middleware - Affects all routes after this
routes.use(authMiddleware);

// [GET] Users - index (User list)
routes.get('/users', UserController.index);

// [PUT] Users - update (User profile update)
routes.put(
  '/users',
  updateUserSchemaValidation,
  authMiddleware,
  UserController.update
);

// [GET] Providers - index (Provider list)
routes.get('/providers', ProviderController.index);

// [GET] Appointments - index (User Appointments list)
routes.get('/appointments', AppointmentController.index);

// [POST] Appointments - store (create new appointment)
routes.post('/appointments', AppointmentController.store);

// [POST] Files - store (File upload)
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
