const express = require("express");
const router = express.Router();
const joi = require("joi");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");

const cardSchema = joi.object({
  bizName: joi.string().required().min(2),
  bizDescription: joi.string().required().min(2).max(255),
  bizAddress: joi.string().required().min(2).max(255),
  bizPhone: joi.string().required().min(8),
  bizImage: joi.string().required().min(2),
});

// create new card
router.post("/", auth, async (req, res) => {
  try {
    // joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    // add new card
    let card = new Card(req.body);
    //  create new bizNumber and check to see if bizNumber allready exists
    let bizNumberFlag = true;
    while (bizNumberFlag) {
      let newBizNumber = _.random(1, 10000);
      let checkCard = await Card.findOne({ bizNumber: newBizNumber });
      if (!checkCard) bizNumberFlag = false;
      card.bizNumber = newBizNumber;
    }
    card.userId = req.payload._id;
    // save card
    await card.save();
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("Error in Card " + error);
  }
});

// find all cards for userID
router.get("/myCards", auth, async (req, res) => {
  try {
    let cards = await Card.find({ userId: req.payload._id });
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send("Error in Card " + error);
  }
});

// find card by id
router.get("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("No Card found");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("Error in Card " + error);
  }
});

// update card by id
router.put("/:id", auth, async (req, res) => {
  try {
    // joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    // update card
    let card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) return res.status(404).send("No Card found");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("Error in Card " + error);
  }
});

// delete card by id
router.delete("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findByIdAndRemove(req.params.id);
    if (!card) return res.status(404).send("No Card found");
    res.status(200).send("Card Deleted Successfully");
  } catch (error) {
    res.status(400).send("Error in Card " + error);
  }
});

// find all cards
router.get("/", auth, async (req, res) => {
  try {
    let cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send("Error in Card " + error);
  }
});

module.exports = router;
