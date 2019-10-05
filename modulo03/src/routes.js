import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationsController from './app/controllers/NotificationsController';

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

// [GET] Users - index (User list)
routes.get('/users', UserController.index);

// [POST] Users - store (User Sign Up)
routes.post('/users', signUpUserSchemaValidation, UserController.store);

// Authorization middleware - Affects all routes after this
routes.use(authMiddleware);

// [PUT] Users - update (User profile update)
routes.put(
  '/users',
  updateUserSchemaValidation,
  // authMiddleware,
  UserController.update
);

// [GET] Providers - index (Provider list)
routes.get('/providers', ProviderController.index);

// [GET] Appointments - index (User Appointments list)
routes.get('/appointments', AppointmentController.index);

// [POST] Appointments - store (create new appointment)
routes.post('/appointments', AppointmentController.store);

routes.delete('/appointments/:id', AppointmentController.delete);

// [GET] Schedule - index
routes.get('/schedules', ScheduleController.index);

// [GET] Notifications - index
routes.get('/notifications', NotificationsController.index);

// [PUT] Notifications - update as read
routes.put('/notifications/:id', NotificationsController.update);

//

// [POST] Files - store (File upload)
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
