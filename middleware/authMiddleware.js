const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.requireSignin = (req, res, next) => {
   if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      try {
         const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
         req.user = user;
         next();
      } catch (error) {
         return res.status(400).json({
            message: "Invalid token",
         });
      }
   } else {
      return res.status(400).json({
         message: "Authorization required",
      });
   }
};

exports.userMiddleware = async (req, res, next) => {
   try {
      const user = await User.findById(req.user._id);
      if (user.role !== "user") {
         return res.status(401).json({
            success: false,
            message: "User Access denied",
         });
      } else {
         next();
      }
   } catch (error) {
      res.status(401).json({
         success: false,
         message: error.message,
         message: "Error in User middleware",
      });
   }
};

exports.adminMiddleware = async (req, res, next) => {
   try {
      const user = await User.findById(req.user._id);
      if (user.role !== "admin") {
         return res.status(401).json({
            success: false,
            message: "Admin Access denied",
         });
      } else {
         next();
      }
   } catch (error) {
      res.status(401).json({
         success: false,
         message: error.message,
         message: "Error in Admin middleware",
      });
   }
};
