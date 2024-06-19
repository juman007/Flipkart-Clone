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

//todo: multer config

const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
   },
   filename: function (req, file, cb) {
      //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, shortid.generate() + "-" + file.originalname);
   },
});
const upload = multer({ storage });

router.post(
   "/category/create",
   requireSignin,
   adminMiddleware,
   upload.single("categoryImage"),
   addCategory
);
router.get("/category/getcategories", getCategories);

module.exports = router;
