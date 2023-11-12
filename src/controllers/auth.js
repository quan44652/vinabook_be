import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../schemas/auth";


const signup = async (req, res) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    const { name, email, password, phone, address } = req.body;
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res.json({
        message: "Tài khoản đã tồn tại !",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      name: name,
      password: hashedPassword,
      phone,
      address,
    });

    const token = await jwt.sign({ _id: user._id }, "12345", {
      expiresIn: "7d",
    });
    return res.json({
      message: "Đăng ký thành công",
      data: user,
      accsetToken: token,
    });
  } catch ({ errors }) {
    return res.json({
      message: errors,
    });
  }
};

const signin = async (req, res) => {
  try {
    await signinSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        message: "Tài khoản chưa tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        message: "Mật khẩu không đúng !",
      });
    }

    const token = jwt.sign({ _id: user._id }, "12345", {
      expiresIn: "7d",
    });

    return res.json({
      message: "Đăng nhập thành công",
      data: user,
      accsetToken: token,
    });
  } catch ({ errors }) {
    return res.json({
      message: errors,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({
        message: "Danh sách tài khoản.",
        data: users
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const capquyenUser = async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.body.id, {
      role: "admin"
    });
    return res.json({
        message: "Cấp quyền tài khoản admin thành công.",
        data: users
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export { signup, signin, getAllUser , capquyenUser };
