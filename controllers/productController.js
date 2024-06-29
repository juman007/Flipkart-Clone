const slugify = require("slugify");
const Product = require("../models/productModel");
const shortid = require("shortid");
const Category = require("../models/categoryModel");

exports.createProduct = async (req, res) => {
   try {
      const { name, price, description, category, quantity } = req.body;

      let productPictures = [];
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

exports.getProductsBySlug = async (req, res) => {
   try {
      const { slug } = req.params;
      const categoryId = await Category.findOne({ slug: slug }).select("_id");

      if (categoryId) {
         const products = await Product.find({ category: categoryId._id });
         return res.status(200).json({
            success: true,
            products,
            productsByPrice: {
               under5k: products.filter((p) => p.price <= 5000),
               under10k: products.filter(
                  (p) => p.price > 5000 && p.price <= 10000
               ),
               under15k: products.filter(
                  (p) => p.price > 10000 && p.price <= 15000
               ),
               under20k: products.filter(
                  (p) => p.price > 15000 && p.price <= 20000
               ),
               under30k: products.filter(
                  (p) => p.price > 20000 && p.price <= 30000
               ),
            },
         });
      } else {
         return res.status(400).json({
            success: false,
            message: "Category not found",
         });
      }
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Error in getting products by slug",
         error: error.message,
      });
   }
};
