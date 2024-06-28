const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../../controllers/admin/authController");
const {
   authValidatorRequest,
   isRequestValidated,
   ValidateSigninRequest,
} = require("../../validator/authValidator");
const { requireSignin } = require("../../middleware/authMiddleware");

router.post("/admin/signin", ValidateSigninRequest, isRequestValidated, signin);
router.post("/admin/signup", authValidatorRequest, isRequestValidated, signup);
router.post("/admin/signout",requireSignin,signout);

module.exports = router;
