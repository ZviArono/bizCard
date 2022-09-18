const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User = require("../models/User");

const registerSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().email().min(6),
  password: joi.string().required().min(8),
  biz: joi.boolean().required(),
});

// register new user
router.post("/", async (req, res) => {
  try {
    // joi validation
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    // cheack if user allready exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User allready exists");
    // add new user
    user = new User(req.body);
    // encrypt passwaord
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // create Token
    const genToken = jwt.sign(
      {
        _id: user._id,
        biz: user.biz,
      },
      process.env.jwtKey
    );

    // save new user
    await user.save();
    res.status(201).send({
      token: genToken,
      details: _.pick(user, ["_id", "name", "email"]),
    });
  } catch (error) {
    res.status(400).send("Error in Register " + error);
  }
});

module.exports = router;
