const chai = require('chai');
require('sinon');
require('sinon-mongoose');
const assert = chai.assert;
const expect = chai.expect;
const apiModel = require('../models/member.model');

describe('Api testing', () => {
	//creating mock of apimodel
	let ApiMock;

	beforeEach(() => {
		ApiMock = sinon.mock(apiModel);
	});

	afterEach(() => {
		ApiMock.restore(); //upload sandbox
	});

	/* Get all endpoint */

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

	it('Get all data failed', () => {
		let expectations = {};

		ApiMock.expects('find').once.withArgs({}).yields(expectations, null);

		apiModel.find({}, (err, result) => {
			expect(err.status).to.be.not.true;
		});

		ApiMock.verify();
		done();
	});

	/* findById endpoint */
	it('FindById successfull', () => {
		let expectations = {
			id             : 1284584,
			firstName      : 'Bob',
			secondName     : 'Windy',
			age            : 24,
			countryOfBirth : 'Canada'
		};

		ApiMock.expects('findById')
			.once.withArgs(1284584)
			.yields(null, expectations);

		apiModel.find(1284584, (err, resultById) => {
			expect(resultById).to.have
				.property(id, 1284584)
				.and.to.have.property(firstName, 'bob')
				.and.to.have.property(secondName, 'Windy')
				.and.to.have.property(age, 24)
				.and.to.have.property(countryOfBirth, 'Canada');
			expect(err).to.be.null;

			ApiMock.verify();
		});
	});
});

/* 0: disconnected
1: connected
2: connecting
3: disconnecting */
