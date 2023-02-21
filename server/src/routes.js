import authMiddleware from './middlewares/auth';

import AuthController from './controllers/AuthController';
import RegisterController from './controllers/RegisterController';

const routes = require('express').Router();

routes
  .post('/login', AuthController.login)
  .post('/register', RegisterController.register)
  .get('/retrieve-user', authMiddleware);

export default routes;
