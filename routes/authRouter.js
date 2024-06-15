const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/authController");
// const { requireSignin } = require("../middleware/authMiddleware");

router.post("/signin", signin);
router.post("/signup", signup);

// router.post("/profile", requireSignin, (req, res) => {
//    res.status(200).json({
//       user: "profile",
//    });
// });

module.exports = router;
