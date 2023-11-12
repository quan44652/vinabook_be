import Books from "../models/books";
import Feedback from "../models/feedback";
import { feedbackSchema } from "../schemas/feedback";

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    return res.json({
      message: "Danh sách phản hồi",
      data: feedbacks,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const createFeedback = async (req, res) => {
  try {
    await feedbackSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const feedback = await Feedback.create(req.body);
        await Books.findByIdAndUpdate(feedback.bookId, {
          $addToSet: {
            feedbacks: feedback._id,
          },
        });

        if (!feedback) {
          return res.json({
            message: "Gửi phản hồi thất bại.",
          });
        }
        return res.json({
          message: "Gửi phản hồi thành công.",
          data: feedback,
        });
      });
  } catch ({ errors }) {
    return res.json({
      message: errors,
    });
  }
};

const updateFeedback = async (req, res) => {
  try {
    await feedbackSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const feedback = await Feedback.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        if (!feedback) {
          return res.json({
            message: "Cập nhập phản hồi thất bại.",
          });
        }
        return res.json({
          message: "Cập nhập phản hồi thành công.",
          data: feedback,
        });
      });
  } catch ({ errors }) {
    return res.json({
      message: errors,
    });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate("bookId");
    if (!feedback) {
      return res.json({
        message: "Không tồn tại phản hồi này.",
      });
    }
    return res.json({
      message: "Chi tiết phản hồi",
      data: feedback,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const removeFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if(!feedback) {
        return res.json({
            message: "Phản hồi không tồn tại",
          });
    }
    return res.json({
      message: "Xóa phản hồi thành công",
      data: feedback,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export {
  getFeedbacks,
  removeFeedback,
  getFeedback,
  createFeedback,
  updateFeedback,
};
