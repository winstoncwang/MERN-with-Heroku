const express = require("express");
const router = express.Router();

const Member = require("../models/member.model");

router.get("/members", async (req, res) => {
  try {
    const allMember = await Member.find({}).exec();
    res.status(200).json(allMember);
  } catch (err) {
    res.status(404).json({ Error: err });
  }
});

router.get("/members/:id", async (req, res) => {
  try {
    let result = await Member.findById(req.params).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      Error: err,
      Message: `Member with id: ${req.params} not found.`,
    });
  }
});

router.post("/members", async (req, res) => {
  try {
    let newMember = new Member(req.body);
    console.log("request", req.body);

    const result = await newMember.save().exec();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.put("/members/:id", async (req, res) => {
  try {
    let result = await Member.updateOne(req.params, { $set: req.body }).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      Error: err,
      Message: `Member with id: ${req.params} not found and updated.`,
    });
  }
});

router.delete("/members/:id", async (req, res) => {
  try {
    let result = await Member.deleteOne(req.params);
    res.status(204).json(result);
  } catch (err) {
    res.status(404).json({
      Error: err,
      Message: `Member with id: ${req.params} not found.`,
    });
  }
});

module.exports = router;
