const slugify = require("slugify");
const Product = require("../models/productModel");
const shortid = require("shortid");

exports.createProduct = async (req, res) => {
   try {
      const { name, price, description, category, createdBy, quantity } =
         req.body;

      if (req.files.length > 0) {
         productPictures = req.files.map((file) => {
            return { img: file.filename };
         });
      }

      const product = new Product({
         name,
         slug: slugify(name),
         price,
         description,
         productPictures,
         category,
         quantity,
         createdBy: req.user._id,
      });
      await product.save();

      res.status(200).json({
         success: true,
         message: "Product created successfully",
         product,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error in creating product",
         error: error.message,
      });
   }
};
