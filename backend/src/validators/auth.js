import checkAPIs from "express-validator/check/index.js";
const { check, validationResult } = checkAPIs;

const validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First name is required!"),
  check("lastName").notEmpty().withMessage("Last name is required!"),
  check("email").isEmail().withMessage("Enter a valid email!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long!"),
];

const validateSigninRequest = [
  check("email").isEmail().withMessage("Enter a valid email!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long!"),
];

const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

export { validateSignupRequest,validateSigninRequest, isRequestValidated };
