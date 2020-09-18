const chai = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');
const assert = chai.assert;
const expect = chai.expect;
const Member = require('../models/member.model');

describe('CRUD Mongoose', () => (
	describe('Create API testing', () => {
		/* save() tests */
		it('save() successful', (done) => {
			let newMemberObj = new Member(
				new Member({ username: 'memberOne' })
			);

			let ApiMock = sinon.mock(newMemberObj);

			let expectation = { status: true };

			ApiMock.expects('save').once().yields(null, expectation);

			newMemberObj.save((error, doc) => {
				expect(doc.status).to.be.true;
				ApiMock.verify();
				ApiMock.restore();
				done();
			});
		});
	}),
	describe('Read API testing', () => {
		//creating mock of apimodel
		let ApiMock;

		beforeEach(() => {
			ApiMock = sinon.mock(Member);
		});

		afterEach(() => {
			ApiMock.restore(); //upload sandbox
		});

		/* find() tests */
		it('find() successful', (done) => {
			let expectations = { status: true, member: {} };
			//expectation

			ApiMock.expects('find')
				.once()
				.withArgs({})
				.yields(null, expectations);
			//use model.find() to get all data
			//CREATED MODEL FOR SCHEMA hence able to use .find() without .exec()
			Member.find({}, (err, result) => {
				expect(result.status).to.be.true;
			});

			ApiMock.verify(); //load in expectation

			done(); //close async test
		});

		it('find() failed', (done) => {
			let expectations = {
				status : false,
				error  : 'failed to gather data'
			};

			ApiMock.expects('find')
				.once()
				.withArgs({})
				.yields(expectations, null);

			Member.find({}, (err, result) => {
				expect(err.status).to.be.not.true;
			});

			ApiMock.verify();
			done();
		});

		/* findById() tests */
		it('findById() successfull', (done) => {
			let expectations = {
				_id            : 1284584,
				firstName      : 'Bob',
				secondName     : 'Windy',
				age            : 24,
				countryOfBirth : 'Canada'
			};

			ApiMock.expects('findById')
				.once()
				.withArgs(1284584)
				.yields(null, expectations);

			Member.findById(1284584, (err, resultById) => {
				expect(resultById).to.have.own.property(
					'_id',
					1284584,
					'firstName',
					'Bob',
					'secondName',
					'Windy',
					'age',
					24,
					'countryOfBirth',
					'Canada'
				);
				expect(err).to.be.null;

				ApiMock.verify();
			});

			done();
		});

		it('findById() failed', (done) => {
			//expectation and return result
			let expectation = { status: false, error: 'no such user exist' };
			ApiMock.expects('findById')
				.once()
				.withArgs(1284584)
				.yields(expectation, null);
			//mongoose callback
			Member.findById(1284584, (err, result) => {
				expect(result).to.be.null;
				expect(err.status).to.be.false;
				expect(err.error).to.be.string;
			});
			ApiMock.verify();
			done();
		});
	})
));

/* 0: disconnected
1: connected
2: connecting
3: disconnecting */
