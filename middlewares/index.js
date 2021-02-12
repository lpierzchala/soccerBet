const auth = require('./auth.middleware');
const { userRegisterVerification, userLoginVerification } = require('./userValidation.middleware');

module.exports = {
  auth,
  userLoginVerification,
  userRegisterVerification
};
