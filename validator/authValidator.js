const { check, validationResult } = require("express-validator");

//todo: For Signup

exports.authValidatorRequest = [
   check("firstName").notEmpty().withMessage("firstName is required"),
   check("lastName").notEmpty().withMessage("lastName is required"),
   check("email").notEmpty().withMessage("valid email is required"),
   check("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters"),
];

//todo: Error Result Display

exports.isRequestValidated = (req, res, next) => {
   const errors = validationResult(req);
   if (errors.array().length > 0) {
      return res.status(400).json({ errors: errors.array()[0].msg });
   }
   next();
};

//todo: For Signin

exports.ValidateSigninRequest = [
   check("email").notEmpty().withMessage("valid email is required"),
   check("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters"),
];

