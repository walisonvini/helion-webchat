import DB from '../database/index';

export default {
  async getAll() {
    try {
      const users = await DB('users').select('id', 'username', 'email', 'full_name', 'profile_picture');
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject({ status: 500, message: 'Erro ao buscar usuários, tente novamente mais tarde.' });
    }
  },
};
