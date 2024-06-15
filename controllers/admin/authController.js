const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { hashPassword, comparePassword } = require("../../helpers/authHelper");

exports.signup = async (req, res, next) => {
   try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName) {
         return res.send({ message: "First Name is required" });
      }

      if (!lastName) {
         return res.send({ message: "Last Name is required" });
      }

      if (!password) {
         return res.send({ message: "Password is required" });
      }

      if (!email) {
         return res.send({ message: "Phone Number is required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(200).json({
            success: false,
            message: "Already email exists",
         });
      }
      const hash_password = await hashPassword(password);

      const newUser = await new User({
         firstName,
         lastName,
         email,
         password: hash_password,
         username: uuidv4(),
         role: "admin",
      }).save();

      res.status(201).json({
         success: true,
         message: "User created successfully",
         user: newUser,
      });
   } catch (error) {
      res.status(404).json({
         error: error.message,
         message: "Something went wrong",
      });
   }
};

exports.signin = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      //todo     validation
      if (!email || !password) {
         return res.status(404).send({
            success: false,
            message: "Invalid email or password",
         });
      }
      //todo  check user
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).send({
            success: false,
            message: "Email is not registered",
         });
      }

      const match = await comparePassword(password, user.password);
      if (!match) {
         return res.status(200).send({
            success: false,
            message: "Invalid password",
         });
      }

      if (user.role !== "admin") {
         return res.status(403).send({
            success: false,
            message: "Access restricted to admins only",
         });
      }

      //todo      token create for login
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
         expiresIn: "1h",
      });
      res.status(200).send({
         success: true,
         message: "User login successfully",
         user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
         },
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "Error in login",
         error,
      });
   }
};
