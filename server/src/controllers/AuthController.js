import Auth from '../models/Auth';

function checkForMissingFields(user) {
  const requiredFields = ['username', 'password'];
  const missingFields = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const field of requiredFields) {
    if (!user[field]) {
      missingFields[field] = true;
    }
  }

  return missingFields;
}

export default {
  login(req, res) {
    const user = req.body;

    const missingFields = checkForMissingFields(user);

    if (Object.keys(missingFields).length !== 0) {
      console.log(missingFields);
      res.status(400).send({ errors: missingFields });
      return;
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
