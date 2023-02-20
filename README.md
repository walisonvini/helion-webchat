# Helion

Helion is an open-source web chat for socket studies. The use of this project is exclusively for educational purposes, and the sale of this software is prohibited.

## 💻 Prerequisites

Before starting, install node.js:
* Node `14.19.0+`

## 🚀 Installing Helion

First, install the dependencies

Install the dependencies vue.js `cd web` or `helion-webchat\web`
```bash
npm install
```

Install the dependencies express `cd server` or `helion-webchat\server`
```bash
npm install
```

configure your database

**This project is initially configured for PostgreSQL database, but you can use any 
database of your preference as long as Knex supports it. Change the database settings 
in the 'knex.js' file inside the 'server' folder.**

```bash
1 - create an .env file with your database configuration, use .env.example as a base.

2 - migrate the tables to your database using the command: npx knex migrate:latest
```

Then run the development server:

```bash
yarn dev
# or
npm run dev
```

Run the express server:

```bash
npm start
```

## 🛠️ Built with
* [Vue3](https://vuejs.org/guide/quick-start.html) - Client framework
* [Express](https://expressjs.com/pt-br/) - Server library
* [Socket.io](https://socket.io/) - Socket
