const express = require("express");
const router = express.Router();
const {
   requireSignin,
   adminMiddleware,
   userMiddleware,
} = require("../middleware/authMiddleware");
const { addItemToCart } = require("../controllers/cartController");

router.post("/user/cart/addtocart", requireSignin, userMiddleware, addItemToCart);

module.exports = router;
