import jwt from 'jsonwebtoken';

import DB from '../database/index';
import config from '../config';

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, config.app.jwt_secret);

    const user = await DB('users').where('id', decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.user = user;

    if (req.url === '/retrieve-user') {
      res.status(200).json({ user: user[0] });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default authMiddleware;
