const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/authController");
const {
   authValidatorRequest,
   isRequestValidated,
   ValidateSigninRequest,
} = require("../validator/authValidator");
// const { requireSignin } = require("../middleware/authMiddleware");

router.post("/signin", ValidateSigninRequest, isRequestValidated, signin);
router.post("/signup", authValidatorRequest, isRequestValidated, signup);

module.exports = router;
