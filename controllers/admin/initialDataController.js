const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");

// todo:   Function to build nested categories
const createCategoryHierarchy = (categories, parentId = null) => {
   const categoryList = [];
   let category;
   if (parentId == null) {
      category = categories.filter((cat) => !cat.parentId);
   } else {
      category = categories.filter((cat) => cat.parentId == parentId);
   }

   for (let cate of category) {
      categoryList.push({
         _id: cate._id,
         name: cate.name,
         slug: cate.slug,
         parentId: cate.parentId,
         children: createCategoryHierarchy(categories, cate._id),
      });
   }

   return categoryList;
};

exports.initialData = async (req, res) => {
   try {
      const categories = await Category.find({});
      const products = await Product.find({})
         .select(
            "_id name price quantity description slug productPictures category"
         )
         .populate({ path: "category", select: "_id name" });

      res.status(200).json({
         categories: createCategoryHierarchy(categories),
         products,
      });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: "some thing went wrong",
         error: error.message,
      });
   }
};
