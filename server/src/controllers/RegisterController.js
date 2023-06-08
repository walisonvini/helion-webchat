import Register from '../models/Register';
import checkForMissingFields from '../utils/checkForMissingFields';

export default {
  register(req, res) {
    const newUser = req.body;

    const missingFields = checkForMissingFields(newUser, ['username', 'password', 'email', 'full_name']);

    if (Object.keys(missingFields).length !== 0) {
      res.status(400).send({ errors: missingFields });
      return;
    } if (newUser.password.length < 4) {
      res.status(400).send({ errors: { password: 'A senha deve ter pelo menos 4 caracteres' } });
      return;
    }

    Register.register(newUser).then((response) => {
      res.status(response.status).send({ message: response.message });
    }).catch((error) => {
      res.status(error.status).send({ message: error.message });
    });
  },
};
