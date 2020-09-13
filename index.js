const express = require('express');
const app = express();
const path = require('path');
const CORS = require('cors');
const PORT = process.env.PORT || 5000;

app
	.use(CORS())
	.use(express.static(path.join(__dirname, 'public')))
	.get('/', (req, res) =>
		res.sendFile(path.join(__dirname, 'public/index.html'))
	);

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//
module.exports = server;
