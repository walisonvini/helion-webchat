import User from '../models/User';

export default {
  getAllUsers(req, res) {
    User.getAll()
      .then((users) => {
        res.status(200).json({ users });
      })
      .catch((error) => {
        res.status(error.status).json({ message: error.message });
      });
  },
};
