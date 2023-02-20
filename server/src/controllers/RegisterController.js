import Register from '../models/Register';

export default {
  register(req, res) {
    Register.register(req.body).then((response) => {
      res.status(response.status).send({ message: response.message });
    }).catch((error) => {
      res.status(error.status).send({ message: error.message });
    });
  },
};
