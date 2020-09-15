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

	it('Get all collections successful', (done) => {
		let expectedResult = {};
		//expectation
		ApiMock.expects('find')
			.once()
			.withArgs({})
			.yields(null, expectedResult);

		//use model.find() to get all data
		//CREATED MODEL FOR SCHEMA hence able to use .find() without .exec()
		apiModel.find({}, (err, result) => {
			expect(result.status).to.be.true;
		});

		ApiMock.verify(); //load in expectation
		ApiMock.restore(); //upload sandbox

		done(); //close async test
	});
});

/* 0: disconnected
1: connected
2: connecting
3: disconnecting */
