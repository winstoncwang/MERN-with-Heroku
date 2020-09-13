const chai = require('chai');
const assert = chai.assert;

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
