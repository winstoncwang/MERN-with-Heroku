const chai = require('chai');
require('sinon');
require('sinon-mongoose');
const assert = chai.assert;
const expect = chai.expect;

describe('connect to mongodb using mongoose', () => {
	//make a mongoose connection
	let mongoose;
	beforeEach(() => {
		require('../index.js');
		mongoose = require('mongoose');
	});

	it('connection successfully', (done) => {
		assert.strictEqual(mongoose.connection.readyState, 1, 'Connected');
		done();
	});
});

/* 0: disconnected
1: connected
2: connecting
3: disconnecting */

//get request from api
describe();
