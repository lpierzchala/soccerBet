const express = require('express');
const mongoose = require('mongoose');
const { userRegisterVerification, userLoginVerification, auth } = require('../middlewares');

const User = mongoose.model('User');
const { registrationController, loginController } = require('../controllers');

/**
 * Express router to mount user related functions on.
 */
const router = express.Router();

/**
 * Route serving user details.
 */
router.get('/current', auth, (req, res) => {
  const { userId } = req;

  return User.findById(userId).then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }
    return res.json({ user: user.toAuthJSON() });
  });
});

/**
 * Route for user login
 */
router.post('/login', userLoginVerification, loginController);

/**
 * Route for user registration.
 */
router.post('/register', userRegisterVerification, registrationController);

module.exports = router;
