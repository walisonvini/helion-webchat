import PrivateMessage from '../models/PrivateMessage';

export default {
  getMessages(req, res) {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    PrivateMessage.getMessages(userId, friendId)
      .then((messages) => {
        res.status(200).json({ messages });
      })
      .catch((error) => {
        res.status(error.status).json({ message: error.message });
      });
  },

  sendMessage(req, res) {
    const message = req.body;

    PrivateMessage.sendMessage(message)
      .then(() => {
        res.status(200).json({ message: 'Mensagem enviada com sucesso.' });
      })
      .catch((error) => {
        res.status(error.status).json({ message: error.message });
      });
  }
};
