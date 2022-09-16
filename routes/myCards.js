const express = require("express");
const router = express.Router();
const joi = require("joi");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");

// find all cards for userID
router.get("/", auth, async (req, res) => {
  try {
    let cards = await Card.find({ userId: req.payload._id });
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send("Error in Card " + error);
  }
});

module.exports = router;
