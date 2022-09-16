const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  biz: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
