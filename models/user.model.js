/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle  */

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 128, 128, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 128, 128, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: Math.floor(Date.now() / 1000) + 3600
    },
    'secret'
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model('User', UserSchema);
