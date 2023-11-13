import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import cartSchema from "../schemas/cart";

const getCart = async (req, res) => {
    try {
        const cart = await Cart.find().populate("cartItems");
        return res.json({
            message: "Thông tin giỏ hàng",
            data: cart,
        });
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

const myCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.id}).populate("cartItems").populate({
            path: 'cartItems',
            populate: {
              path: 'bookId',
              model: 'Book'
            }
          })
        return res.json({
            message: "Giỏ hàng của bạn",
            data: cart,
        });
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

const addToCart = async (req, res) => {
    try {
        await cartSchema
            .validate(req.body, { abortEarly: false })
            .then(async () => {
                const { userId, bookId, quantity , total } = req.body;
                const exitsCart = await Cart.findOne({ userId: userId }).populate(
                    "cartItems"
                );
                
                if (exitsCart) {
                    const bookExist = exitsCart.cartItems.find(
                        (item) => item.bookId == bookId
                    );
                   
                    if (bookExist) {
                        if (quantity <= 0) {
                            await CartItem.findByIdAndDelete(bookExist._id);
                            return res.json({
                                message: "Sản phẩm đã xóa khỏi giỏ hàng.",
                            });
                        }
                        else {
                            console.log(exitsCart);
                        
                            const cartItem = await CartItem.findByIdAndUpdate(
                                bookExist._id,
                                {
                                    quantity: quantity,
                                    total: total
                                },
                                { upsert: true, new: true }
                            );
                            return res.json({
                                message: "Thêm sản phẩm vào giỏ hàng.",
                                data: cartItem,
                            });
                        }    
                    }

                    const cartItem = await CartItem.create({ bookId, quantity , total });
                    await Cart.findByIdAndUpdate(exitsCart._id, {
                        $addToSet: { cartItems: cartItem._id },
                    });

                    return res.json({
                        message: "Thêm sản phẩm vào giỏ hàng.",
                        data: cartItem,
                    });
                } else {
                    const newCart = await Cart.create({ userId: userId });
                    const cartItem = await CartItem.create({ bookId, quantity, total });

                    await Cart.findByIdAndUpdate(newCart._id, {
                        $addToSet: { cartItems: cartItem._id },
                    });
                    return res.json({
                        message: "Thêm sản phẩm vào giỏ hàng.",
                        data: cartItem,
                    });
                }
            });
    } catch ({ errors }) {
        return res.json({
            message: errors,
        });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.findByIdAndDelete(req.params.id);
        if (!cartItem) {
            return res.json({
                message: "Sản phẩm không tồn tại.",
            });
        }
            await Cart.findOneAndUpdate(
            { userId: req.body.userId },
            {
                $pull: { cartItems: cartItem._id },
            },
            { new: true }
        );

      
        return res.json({
            message: "Xóa sản phẩm khỏi giỏ hàng.",
            data: cartItem,
        });
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

export { getCart, addToCart, removeCartItem  , myCart};
