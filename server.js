const express = require('express');

const accounts = require('./routes/accounts.routes.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', accounts);

module.exports = server;
