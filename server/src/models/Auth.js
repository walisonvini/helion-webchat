import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import DB from '../database/index';

export default {
  async login(user) {
    const { username, password } = user;

    try {
      const user = await DB('users').where('username', username).orWhere('email', username).first();

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: 18000,
        });
        return Promise.resolve({
          status: 200, message: 'Login realizado com sucesso!', user, token,
        });
      }
      return Promise.reject({ status: 404, message: 'Nome de usuario ou senha incorretos' });
    } catch (error) {
      return Promise.reject({ status: 404, message: 'Nome de usuario ou senha incorretos' });
    }
  },
};
