const chai = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');
const assert = chai.assert;
const expect = chai.expect;
const Member = require('../models/member.model');

describe('Api testing', () => {
	//creating mock of apimodel
	let ApiMock;

	beforeEach(() => {
		ApiMock = sinon.mock(Member);
	});

	afterEach(() => {
		ApiMock.restore(); //upload sandbox
	});

	/* Get all endpoint */

	it('Get all data successful', (done) => {
		let expectations = { status: true, member: {} };
		//expectation

		ApiMock.expects('find').once().withArgs({}).yields(null, expectations);
		//use model.find() to get all data
		//CREATED MODEL FOR SCHEMA hence able to use .find() without .exec()
		Member.find({}, (err, result) => {
			expect(result.status).to.be.true;
		});

		ApiMock.verify(); //load in expectation

		done(); //close async test
	});

	it('Get all data failed', (done) => {
		let expectations = { status: false, error: 'failed to gather data' };

		ApiMock.expects('find').once().withArgs({}).yields(expectations, null);

		Member.find({}, (err, result) => {
			expect(err.status).to.be.not.true;
		});

		ApiMock.verify();
		done();
	});

	/* findById endpoint */
	it('FindById successfull', (done) => {
		let expectations = {
			id             : 1284584,
			firstName      : 'Bob',
			secondName     : 'Windy',
			age            : 24,
			countryOfBirth : 'Canada'
		};

		ApiMock.expects('findById')
			.once()
			.withArgs(1284584)
			.yields(null, expectations);

		console.log(ApiMock);
		Member.findById(1284584, (err, resultById) => {
			console.log(resultById);
			expect(resultById).to.have
				.property(id, 1284584)
				.and.to.have.property(firstName, 'bob')
				.and.to.have.property(secondName, 'Windy')
				.and.to.have.property(age, 24)
				.and.to.have.property(countryOfBirth, 'Canada');
			expect(err).to.be.null;

			ApiMock.verify();
		});

		done();
	});
});

/* 0: disconnected
1: connected
2: connecting
3: disconnecting */
