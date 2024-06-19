const express = require("express");
const path = require("path");
const env = require("dotenv");
const { connectDB } = require("./DBconfic/db");

//todo: Load environment variables
env.config();

const app = express();

//todo: Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//todo: Serve static files from the 'uploads' directory
app.use("/public", express.static(path.join(__dirname, "uploads")));

//todo: Import routes
const userRoutes = require("./routes/authRouter.js");
const adminRoutes = require("./routes/admin/authRouter.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const productRoutes = require("./routes/productRouter.js");
const cartRoutes = require("./routes/cartRouter.js");

//todo: Use routes
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

//todo: Connect to the database
connectDB();

//todo: Start the server
app.listen(process.env.PORT, () => {
   console.log(`Server running on port ${process.env.PORT}`);
});
