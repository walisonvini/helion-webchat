import AuthController from './controllers/AuthController';
import RegisterController from './controllers/RegisterController';

const routes = require('express').Router();

routes
  .get('/login', AuthController.login)
  .post('/register', RegisterController.register);

export default routes;
