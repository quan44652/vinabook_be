import jwt from "jsonwebtoken";
import User from "../models/user";

const checkPermisstion = async (req, res, next) => {

  try {
    if (req.headers.authorization == undefined) {
      return res.json({
        error: "Bạn cần phải đăng nhập để thực hiện hành động này",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token, "anhquan");
    const user = await User.findById(_id);

    if (user.role != "admin") {
      return res.json({
        error: "Bạn không có quyền thực hiện hành động này !!!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export default checkPermisstion;
