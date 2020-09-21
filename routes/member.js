const express = require('express');
const router = express.Router();

const Member = require('../models/member.model');

router.get('/', async (req, res) => {
	try {
		const allMember = await Member.find({}).exec();
		res.status(200).json(allMember);
	} catch (err) {
		res.status(400).json('Error: ' + err);
	}
});

router.post('/member', async (req, res) => {
	try {
		let newMember = new Member(req.body);
		console.log('request', req.body);

		const result = await newMember.save();
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json('Error' + err);
	}
});

module.exports = router;
