const Category = require("../models/categoryModel");
const slugify = require("slugify");
const { create } = require("../models/userModel");

exports.addCategory = async (req, res) => {
   try {
      const categoryObj = {
         name: req.body.name,
         slug: slugify(req.body.name),
      };

      let categoryImage;

      if (req.file) {
         categoryObj.categoryImage =
            process.env.API + "/public/" + req.file.filename;
      }

      if (req.body.parentId) {
         categoryObj.parentId = req.body.parentId;
      }

      const cat = new Category(categoryObj);

      await cat.save();

      res.status(201).json({
         success: true,
         message: "Category created successfully",
         category: cat,
      });
   } catch (error) {
      return res.status(400).json({
         success: false,
         message: "some thing went wrong",
         error: error.message,
      });
   }
};

exports.getCategories = async (req, res) => {
   try {
      const categories = await Category.find({});

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

      const categoryHierarchy = createCategoryHierarchy(categories);

      res.status(200).json({
         success: true,
         categories: categoryHierarchy,
      });
   } catch (error) {
      return res.status(400).json({
         success: false,
         message: "some thing went wrong",
         error: error.message,
      });
   }
};
