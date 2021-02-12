const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }
    return res.status(400).json({
      errors: {
        info
      }
    });
  })(req, res, next);
};
