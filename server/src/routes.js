import authMiddleware from './middlewares/auth';

import AuthController from './controllers/AuthController';
import RegisterController from './controllers/RegisterController';
import UserController from './controllers/UserController';
import PrivateMessageController from './controllers/PrivateMessageController';

const routes = require('express').Router();

routes
  .post('/login', AuthController.login)
  .post('/register', RegisterController.register)
  .get('/retrieve-user', authMiddleware)
  .get('/users', authMiddleware, UserController.getAllUsers)
  .get('/private-messages/:userId/:friendId', authMiddleware, PrivateMessageController.getMessages)
  .post('/private-messages', authMiddleware, PrivateMessageController.sendMessage);

export default routes;
