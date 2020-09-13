const request = require('supertest');

describe('GET / to return something', function () {
	let server;
	beforeEach(() => {
		server = require('../index.js');
	});
	afterEach(() => {
		server.close();
	});

	it('responds with a status code of 200', function (done) {
		request(server).get('/').expect(200, done);
	});
	it('respond 404 with other endpoints ', function (done) {
		request(server).get('/random').expect(404, done);
	});
	it('respond with a file ', function (done) {
		request(server).get('/').expect(404, done);
	});
});
