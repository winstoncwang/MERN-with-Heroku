const chai = require('chai');
require('sinon');
require('sinon-mongoose');
const assert = chai.assert;
const expect = chai.expect;
const apiModel = require('');

describe('Api testing', () => {
	//creating mock of apimodel
	let ApiMock;

	beforeEach(() => {
		ApiMock = sinon.mock(apiModel);
	});

	afterEach(() => {
		ApiMock.restore(); //upload sandbox
	});

	/* Get API Testing */

	it('Get all data successful', (done) => {
		let expectations = {};
		//expectation
		ApiMock.expects('find').once().withArgs({}).yields(null, expectations);

		//use model.find() to get all data
		//CREATED MODEL FOR SCHEMA hence able to use .find() without .exec()
		apiModel.find({}, (err, result) => {
			expect(result.status).to.be.true;
		});

		ApiMock.verify(); //load in expectation

		done(); //close async test
	});

	it('Failed getting all data', () => {
		let expectations = {};

		ApiMock.expects('find').once.withArgs({}).yields(expectations, null);

		apiModel.find({}, (err, result) => {
			expect(err.status).to.be.not.true;
		});

		ApiMock.verify();
		done();
	});

	it('');
});

/* 0: disconnected
1: connected
2: connecting
3: disconnecting */
