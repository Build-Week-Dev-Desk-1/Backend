const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const logsRouter = require('../tickets/tickets-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/tickets', logsRouter);
server.get("/", (req, res) => {
    res.json({ api: "This DevDesk API is up and running" });
});

module.exports = server;