const express = require("express");
const router = express.Router();
const { signup, signin } = require("../../controllers/admin/authController");
const {
   authValidatorRequest,
   isRequestValidated,
   ValidateSigninRequest,
} = require("../../validator/authValidator");
// const { requireSignin } = require("../middleware/authMiddleware");

router.post("/admin/signin", ValidateSigninRequest, isRequestValidated, signin);
router.post("/admin/signup", authValidatorRequest, isRequestValidated, signup);

module.exports = router;
