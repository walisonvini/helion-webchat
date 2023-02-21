import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from './config';
import routes from './routes';

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://127.0.0.1:5173',
  methods: [['GET', 'POST', 'PUT', 'DELETE']],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(routes);

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(config.app.port, () => {
  console.log('Listening server on port', config.app.port);
});
