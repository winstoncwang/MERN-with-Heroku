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
				new Member({ username: 'memberOne' }) //where username is the required field
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
		let findSuccess;
		let findFail;
		let findByIdSuccess;
		let findByIdFail;

		before(() => {
			findSuccess = { status: true, member: {} };
			findFail = {
				status : false,
				error  : 'failed to gather data'
			};
			findByIdSuccess = {
				_id            : 1284584,
				firstName      : 'Bob',
				secondName     : 'Windy',
				age            : 24,
				countryOfBirth : 'Canada'
			};
			findByIdFail = { status: false, error: 'no such user exist' };
			ApiMock = sinon.mock(Member);
		});

		after(() => {
			ApiMock.verify(); //verifies the expectations from first to last and restore()
			ApiMock.restore(); //Resets the original method
		});

		/* find() tests */
		it('find() successful', (done) => {
			//expectation

			ApiMock.expects('find')
				.once()
				.withArgs({})
				.yields(null, findSuccess);

			//use model.find() to get all data
			//CREATED MODEL FOR SCHEMA hence able to use .find() without .exec()
			console.log(ApiMock);
			Member.find({}, (err, result) => {
				expect(result.status).to.be.true;
				done();
			});
		});

		it('find() failed', (done) => {
			console.log('after verify', ApiMock);
			ApiMock.expects('find')
				.once()
				.withArgs({ _id: 1234 })
				.yields(findFail, null);
			console.log('after new expects', ApiMock);
			Member.find({ _id: 1234 }, (err, result) => {
				expect(err.status).to.be.not.true;

				ApiMock.verify();
				ApiMock.restore();
				done();
			});
		});

		/* findById() tests */
		it('findById() successfull', (done) => {
			ApiMock.expects('findById')
				.once()
				.withArgs(1284583)
				.yields(null, findByIdSuccess);
			console.log(ApiMock);
			Member.findById(1284583, (err, resultById) => {
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
				done();
			});
		});

		it('findById() failed', (done) => {
			//expectation and return result
			ApiMock.expects('findById')
				.once()
				.withArgs(1284584)
				.yields(findByIdFail, null);
			//mongoose callback
			Member.findById(1284584, (err, result) => {
				expect(result).to.be.null;
				expect(err.status).to.be.false;
				expect(err.error).to.be.string;
			});
			done();
		});
	})
));

/* 0: disconnected
1: connected
2: connecting
3: disconnecting */
