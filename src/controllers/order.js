import orderSchema from "../schemas/order";
import Order from "../models/order";
import Cart from "../models/cart";
import CartItem from "../models/cartItem";

const getOrder = async (req, res) => {
  try {
    const data = await Order.find().populate("cartItems");
    return res.json({
      message: "Danh sách đơn hàng.",
      data: data,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const myOrder = async (req, res) => {
  try {
    const data = await Order.find({ userId: req.params.id }).populate({
      path: 'cartItems',
      populate: {
        path: 'bookId',
        model: 'Book'
      }
    })
    return res.json({
      message: "Đơn hàng của bạn.",
      data: data,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    await orderSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const { userId, phone, address, name, bookId, quantity, total } =
          req.body;
        if (bookId) {

          const cartItem = await CartItem.create({  bookId, quantity, total });

          const newOrder = {
            name,
            userId,
            address,
            phone,
            cartItems: [cartItem._id],
          };
          const order = await Order.create(newOrder);
          return res.json({
            message: "Đặt hàng thành công.",
            data: order,
          });
        }
        const myCart = await Cart.findOne({ userId: userId });
        const newOrder = {
          name,
          userId,
          address,
          phone,
          cartItems: myCart.cartItems,
        };
        const order = await Order.create(newOrder);
        await Cart.findByIdAndUpdate(myCart._id, { cartItems: [] });
        return res.json({
          message: "Đặt hàng thành công.",
          data: order,
        });
      });
  } catch ({ errors }) {
    return res.json({
      message: errors,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const resp = await Order.findById(req.params.id);
    if (Number(resp.status) < 1) {
      return res.json({
        message: "Hủy đơn hàng không hợp lệ.",
      });
    }

    const data = await Order.findByIdAndUpdate(req.params.id, {
      status: 0,
    });
    return res.json({
      message: "Hủy đơn hàng thành công.",
      data: data,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const changeOrder = async (req, res) => {
  try {
    const resp = await Order.findById(req.params.id);
    if (Number(resp.status) == 0) {
      return res.json({
        message: "Trạng thái đơn hàng không hợp lệ.",
      });
    }

    const data = await Order.findByIdAndUpdate(req.params.id, {
      status: Number(resp.status) + 1,
    });
    return res.json({
      message: "Đơn hàng đã chuyển trạng thái",
      data: data,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export { getOrder, createOrder, myOrder, cancelOrder, changeOrder };
