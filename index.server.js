const express = require("express");
const app = express();
const env = require("dotenv");
const { connectDB } = require("./DBconfic/db");

//todo: routes

const userRoutes = require("./routes/authRouter.js");
const adminRoutes = require("./routes/admin/authRouter.js");

//todo:      environment variables
env.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
   res.status(200).json({
      message: "Hello From Server",
   });
});

app.post("/data", (req, res, next) => {
   res.status(200).json({
      message: req.body,
   });
});

app.use("/api", userRoutes);
app.use("/api", adminRoutes);

//todo: database connection
connectDB();

app.listen(process.env.PORT, () => {
   console.log(`Serving on port ${process.env.PORT}`);
});
