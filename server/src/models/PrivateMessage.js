import DB from '../database/index';

export default {
  async getMessages(userId, friendId) {
    try {
      const messages = await DB('private_messages')
      .select('*')
      .where(function () {
        this.where('sent_from_id', userId).andWhere('sent_to_id', friendId)
      })
      .orWhere(function () {
        this.where('sent_from_id', friendId).andWhere('sent_to_id', userId)
      });
      
      return Promise.resolve(messages);
    } catch (error) {
      return Promise.reject({ status: 500, message: 'Erro ao buscar mensagens, tente novamente mais tarde.' });
    }
  },

  async sendMessage(message) {
    try {
        const teste =  await DB('private_messages').insert(message);
        return teste
    } catch (error) {
        return Promise.reject({ status: 500, message: 'Erro ao enviar mensagem, tente novamente mais tarde.' });
    }
  }
};
