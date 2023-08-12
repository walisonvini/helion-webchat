import Auth from '../models/Auth';
import checkForMissingFields from '../utils/checkForMissingFields';

export default {
  login(req, res) {
    const user = req.body;

    const missingFields = checkForMissingFields(user, ['username', 'password']);

    if (Object.keys(missingFields).length !== 0) {
      return res.status(400).send({ errors: missingFields });
    }

    Auth.login(user).then((reponse) => {
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
