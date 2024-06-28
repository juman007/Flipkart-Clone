const express = require("express");
const path = require("path");
const env = require("dotenv");
const { connectDB } = require("./DBconfic/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load environment variables
env.config();

const app = express();

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Enable CORS
app.use(
   cors({
      origin: "http://localhost:2000", // Frontend URL
      credentials: true,
   })
);

// Serve static files from the 'uploads' directory
app.use("/public", express.static(path.join(__dirname, "uploads")));

// Import routes
const userRoutes = require("./routes/authRouter.js");
const adminRoutes = require("./routes/admin/authRouter.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const productRoutes = require("./routes/productRouter.js");
const cartRoutes = require("./routes/cartRouter.js");
const initialDataRoutes = require("./routes/admin/initialDataRoutes.js"); // Corrected

// Use routes
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes); // Corrected

// Connect to the database
connectDB();

// Start the server
app.listen(process.env.PORT, () => {
   console.log(`Server running on port ${process.env.PORT}`);
});
