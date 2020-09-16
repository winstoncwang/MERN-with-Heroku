const express = require('express');
const app = express();
const path = require('path');
const CORS = require('cors');
const config = require('./config/config');

const apiRouter = require('./routes/index');

app.use(CORS()).use(express.static(path.join(__dirname, 'public')));

app.use(apiRouter);

const server = app.listen(config.port, () =>
	console.log(`Listening on ${config.port}`)
);

//
module.exports = server;
