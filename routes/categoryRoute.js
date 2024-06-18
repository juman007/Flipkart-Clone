const express = require("express");
const router = express.Router();
const {
   addCategory,
   getCategories,
} = require("../controllers/categoryController");
const {
   requireSignin,
   adminMiddleware,
} = require("../middleware/authMiddleware");

router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getcategories", getCategories);

module.exports = router;
