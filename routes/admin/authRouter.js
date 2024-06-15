const express = require("express");
const router = express.Router();
const { signup, signin } = require("../../controllers/admin/authController");
// const { requireSignin } = require("../middleware/authMiddleware");

router.post("/admin/signin", signin);
router.post("/admin/signup", signup);

module.exports = router;
