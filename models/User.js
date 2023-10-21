const mongoose = require('mongoose');
const Schema = require("./db");

const userSchema = new Schema({
  uid: {
    type: Number
  },
  name: {
    type: String
  },
  referral: {
    type: String
  },
  rid: {
    type: Number
  },
  nameHash: {
    type: String
  },
  txHash: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
