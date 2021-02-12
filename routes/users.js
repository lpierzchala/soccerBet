const express = require('express');
const mongoose = require('mongoose');
const { userRegisterVerification, userLoginVerification, auth } = require('../middlewares');

const router = express.Router();
const User = mongoose.model('User');
const { registrationController, loginController } = require('../controllers');

/* GET users listing. */
router.get('/current', auth, (req, res) => {
  const { userId } = req;

  return User.findById(userId).then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }
    return res.json({ user: user.toAuthJSON() });
  });
});

router.post('/login', userLoginVerification, loginController);

router.post('/register', userRegisterVerification, registrationController);

module.exports = router;
