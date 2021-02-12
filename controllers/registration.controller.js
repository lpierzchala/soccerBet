const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = async (req, res) => {
  const { user } = req.body;
  const newUser = new User(user);

  newUser.setPassword(user.password);

  return newUser
    .save()
    .then(() => res.json({ user: newUser.toAuthJSON() }))
    .catch(() =>
      res.status(422).json({
        errors: {
          email: 'Already exist'
        }
      })
    );
};
