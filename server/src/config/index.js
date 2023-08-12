require('dotenv').config();

module.exports = {
  app: {
    port: process.env.SERVER_PORT || 8080,
    jwt_secret: process.env.JWT_SECRET,
  },
  db: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
  },
};
