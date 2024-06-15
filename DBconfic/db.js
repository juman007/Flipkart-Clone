const mongoose = require("mongoose");

exports.connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB Successfully Connected");
   } catch (error) {
      console.log(error);
   }
};
