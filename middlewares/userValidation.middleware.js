const { check, validationResult } = require('express-validator');

const EMAIL_IS_EMPTY = 'Email is empty';
const PASSWORD_IS_EMPTY = 'Password is empty';
const PASSWORD_LENGTH_MUST_BE_MORE_THAN_6 = 'Password length must be more than 6 characters';
const EMAIL_IS_IN_WRONG_FORMAT = 'Email is in incorrect format';


/**
 * Checks if errors occurred during validation
 */
const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
  return next();
};

/**
 * Verify provided user details provided during login
 */
const userLoginVerification = [
  check('user.email').exists().withMessage(EMAIL_IS_EMPTY).isEmail().withMessage(EMAIL_IS_IN_WRONG_FORMAT),
  check('user.password').exists().withMessage(PASSWORD_IS_EMPTY),
  checkValidationErrors
];

/**
 * Verify provided user details provided during registration
 */
const userRegisterVerification = [
  check('user.email').exists().withMessage(EMAIL_IS_EMPTY).isEmail().withMessage(EMAIL_IS_IN_WRONG_FORMAT),
  check('user.password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .isLength({ min: 6 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_6),
  checkValidationErrors
];

module.exports = {
  userLoginVerification,
  userRegisterVerification
};
