import bcrypt from 'bcrypt';
import DB from '../database/index';

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export default {
  async register(newUser) {
    const user = newUser;
    const hashedPassword = await hashPassword(user.password);

    user.password = hashedPassword;

    try {
      await DB('users').insert(user);

      return Promise.resolve({ status: 201, message: 'registrado com sucesso' });
    } catch (error) {
      console.log();
      if (error.constraint === 'users_username_unique') {
        return Promise.reject({ status: 409, message: 'Nome de usuario já existe' });
      } if (error.constraint === 'users_email_unique') {
        return Promise.reject({ status: 409, message: 'Email já existe' });
      }
      return Promise.reject({ status: 500, message: 'Erro ao criar uma conta, tente novamente mais tarde.' });
    }
  },
};
