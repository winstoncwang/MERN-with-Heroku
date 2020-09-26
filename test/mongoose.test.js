const chai = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');
const assert = chai.assert;
const expect = chai.expect;
const Member = require('../models/member.model');

describe('CRUD Mongoose', () => (
	describe('Create API tests', () => {
		let newMembObjSuccess;
		let newMembObjFailed;
		let ApiSuccessMock;
		let ApiFailedMock;

		before(() => {
			newMembObjSuccess = new Member({
				username: 'winstoncwang',
				firstname: 'Winston',
				familyname: 'Wang',
				age: 13,
				dob: {
					date: 15,
					month: 1,
					year: 2007,
				},
				password: 'encryptedstring',
			}); //where username is the required field
			newMembObjFailed = new Member(
				{ username: 'memberOne' }, //where username is the required field
			);

			ApiSuccessMock = sinon.mock(newMembObjSuccess);
			ApiFailedMock = sinon.mock(newMembObjFailed);

			expectationSuccess = {
				status: 200,
				response: {
					accountcreationdate: '2020-09-26T01:05:38.711Z',
					accountupdatedate: '2020-09-26T01:05:38.711Z',
					_id: '5f6e9602cbc91a464877d9e6',
					username: 'winstoncwang',
					firstname: 'Winston',
					familyname: 'Wang',
					age: 13,
					dob: {
						date: 15,
						month: 1,
						year: 2007,
					},
					password: 'encryptedstring',
					__v: 0,
				},
			};
			expectationFailed = {
				status: 400,
				error: {
					ValidationError:
						'dob.year: Path `dob.year` is required., dob.month: Path `dob.month` is required., dob.date: Path `dob.date` is required.',
				},
			};
		});

		after(() => {
			ApiSuccessMock.verify();
			ApiFailedMock.verify();
		});

		/* save() tests */
		it('save() successful', (done) => {
			ApiSuccessMock.expects('save')
				.once()
				.yields(null, expectationSuccess);

			newMembObjSuccess.save((error, result) => {
				assert.strictEqual(result.status, 200, 'status code:200');
				expect(result.response).to.have.ownProperty(
					'accountcreationdate',
					'2020-09-26T01:05:38.711Z',
					'accountupdatedate',
					'2020-09-26T01:05:38.711Z',
					'_id',
					'5f6e9602cbc91a464877d9e6',
					'username',
					'winstoncwang',
					'firstname',
					'Winston',
					'familyname',
					'Wang',
					'age',
					13,
					'dob',
					{
						date: 15,
						month: 1,
						year: 2007,
					},
					'password',
					'encryptedstring',
					'__v',
					0,
				);
				expect(error).to.be.null;
				done();
			});
		});
		it('save() failed', (done) => {
			ApiFailedMock.expects('save')
				.once()
				.yields(expectationFailed, null);

			newMembObjFailed.save((err, result) => {
				expect(result).to.be.null;
				assert.strictEqual(err.status, 400, 'status code:400');
				expect(err.error).to.have.ownProperty('ValidationError');
			});
			done();
		});
	}),
	describe('Read API tests', () => {
		//creating mock of apimodel
		let ApiMock;
		let expectationFindSuccess;
		let expectationFindFail;
		let expectationFindByIdSuccess;
		let expectationFindByIdFail;

		before(() => {
			ApiMock = sinon.mock(Member);

			expectationFindSuccess = { status: true, member: {} };
			expectationFindFail = {
				status: false,
				error: 'failed to gather data',
			};
			expectationFindByIdSuccess = {
				_id: 1284584,
				firstName: 'Bob',
				secondName: 'Windy',
				age: 24,
				countryOfBirth: 'Canada',
			};
			expectationFindByIdFail = {
				status: false,
				error: 'no such user exist',
			};
		});

		after(() => {
			ApiMock.verify(); //verifies the expectations from first to last and restore()
			//ApiMock.restore(); //Resets the original method
		});

		/* find() tests */
		it('find() successful', (done) => {
			//expectation

			ApiMock.expects('find')
				.once()
				.withArgs({})
				.yields(null, expectationFindSuccess);

			//use model.find() to get all data
			//CREATED MODEL FOR SCHEMA hence able to use .find() without .exec()
			Member.find({}, (err, result) => {
				expect(result.status).to.be.true;
				expect(err).to.be.null;
				done();
			});
		});

		it('find() failed', (done) => {
			ApiMock.expects('find')
				.once()
				.withArgs({ _id: 1234 })
				.yields(expectationFindFail, null);

			Member.find({ _id: 1234 }, (err, result) => {
				expect(err.status).to.be.not.true;
				expect(result).to.be.null;
				done();
			});
		});

		/* findById() tests */
		it('findById() successfull', (done) => {
			ApiMock.expects('findById')
				.once()
				.withArgs(1284583)
				.yields(null, expectationFindByIdSuccess);

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
					'Canada',
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
				.yields(expectationFindByIdFail, null);
			//mongoose callback
			Member.findById(1284584, (err, result) => {
				expect(result).to.be.null;
				expect(err.status).to.be.false;
				expect(err.error).to.be.string;
			});
			done();
		});
	}),
	describe('Update API tests', () => {
		let ApiMock;
		let expectationUpdateOneFailed;
		let expectationUpdateOneSuccess;

		before(() => {
			ApiMock = sinon.mock(Member);

			expectationUpdateOneSuccess = {
				status: 200,
				response: { n: 1, nModified: 1, ok: 1 },
			};
			expectationUpdateOneFailed = {
				status: 400,
				DocumentNotFoundError: '$filename not found.',
			};
		});

		after(() => {
			ApiMock.verify();
		});

		it('updateOne() successful', (done) => {
			ApiMock.expects('updateOne')
				.once()
				.withArgs({ username: 'winstoncwang' }, { $set: { age: 55 } })
				.yields(null, expectationUpdateOneSuccess);

			Member.updateOne(
				{ username: 'winstoncwang' },
				{ $set: { age: 55 } },
				(error, result) => {
					expect(result.status).to.equal(200);
					expect(result.response).to.have.ownProperty(
						'n',
						1,
						'nModified',
						1,
						'ok',
						1,
					);
					expect(error).to.be.null;
				},
			);
			done();
		});

		it('updateOne() failed', (done) => {
			ApiMock.expects('updateOne')
				.once()
				.withArgs(
					{ username: 'winstoncwang' },
					{ $set: { age: 55, password: 'encryptedString' } },
				)
				.yields(expectationUpdateOneFailed, null);

			Member.updateOne(
				{ username: 'winstoncwang' },
				{ $set: { age: 55, password: 'encryptedString' } },
				(err, result) => {
					expect(result).to.be.null;
					expect(err.status).to.equal(400);
					expect(err.response).to.have.ownProperty(
						'DocumentNotFoundError',
						'$filename not found.',
					);
				},
				done(),
			);
		});
	}),
	describe('Delete API tests', () => {
		let ApiMock;
		let expectationDeleteOneFailed;
		let expectationDeleteOneSuccess;

		before(() => {
			ApiMock = sinon.mock(Member);
			expectationDeleteOneSuccess = { status: 200, response: {} };
			expectationDeleteOneFailed = {
				status: 400,
				response: { err: 'Deletion failed.' },
			};
		});

		after(() => {
			ApiMock.verify();
		});

		it('deleteOne() successful', (done) => {
			ApiMock.expects('deleteOne')
				.once()
				.withArgs({ username: 'winstoncwang' })
				.yields(null, expectationDeleteOneSuccess);

			Member.deleteOne({ username: 'winstoncwang' }, (err, result) => {
				expect(err).to.be.null;
				expect(result.status).to.equal(200);
				expect(result.response).to.be.empty;
			});
			done();
		});

		it('deleteOne() failed', (done) => {
			ApiMock.expects('deleteOne')
				.once()
				.withArgs({ username: 'newuser' })
				.yields(expectationDeleteOneFailed, null);

			Member.deleteOne({ username: 'newuser' }, (err, result) => {
				expect(result).to.be.null;
				expect(err.status).to.equal(400);
				expect(err.response).to.have.ownProperty(
					'err',
					'Deletion failed.',
				);
			});
			done();
		});
	})
));
