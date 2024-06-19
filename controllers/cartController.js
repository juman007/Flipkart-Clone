const Cart = require("../models/cartModel");

exports.addItemToCart = async (req, res, next) => {
   try {
      let cart = await Cart.findOne({ user: req.user._id });

      if (cart) {
         req.body.cartItems.forEach((cartItem) => {
            const product = cartItem.product;
            const item = cart.cartItems.find((c) => c.product == product);

            if (item) {
               item.quantity =
                  Number(item.quantity) + Number(cartItem.quantity);
            } else {
               cart.cartItems.push(cartItem);
            }
         });

         await cart.save();
      } else {
         cart = new Cart({
            user: req.user._id,
            cartItems: req.body.cartItems,
         });

         await cart.save();
      }

      res.status(201).json({
         success: true,
         message: "Cart updated successfully",
         cart,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Something went wrong",
         error: error.message,
      });
   }
};
