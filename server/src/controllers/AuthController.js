import Auth from '../models/Auth';

export default {
  login(req, res) {
    const { username, password } = req.body;

    Auth.login(username, password).then((reponse) => {
      res.status(reponse.status).send({
        message: reponse.message,
        status_code: reponse.status,
        token: reponse.token,
        user: reponse.user,
      });
    }).catch((error) => {
      res.status(error.status).send({ message: error.message });
    });
  },
};
