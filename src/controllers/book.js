import { bookSchema } from "../schemas/book";
import Book from "../models/books";
import Category from "../models/category";

const getBooks = async (req, res) => {
  try {
    const {
      _sort = "createdAt",
      _order = "desc",
      _page = 1,
      _limit = 999,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? 1 : -1,
      },
      populate: ["categoryId", "feedbacks"],
    };
    const books = await Book.paginate({}, options);

    const newBooks = books.docs.filter((item) => item.isDelete == false);
    if (!books) {
      return res.json({
        message: "Lấy danh sách thất bại",
      });
    }
    return res.json({
      message: "Lấy danh sách thành công.",
      data: newBooks,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { search = "" } = req.body;

    const books = await Book.find();
    const newBooks = books
      .filter((item) => item.isDelete == false &&  item.name.includes(search))
    if (!books) {
      return res.json({
        message: "Lấy danh sách thất bại",
      });
    }
    return res.json({
      message: "Lấy danh sách thành công.",
      data: newBooks,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const createBook = async (req, res) => {
  try {
    await bookSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const book = await Book.create(req.body);
        await Category.findByIdAndUpdate(book.categoryId, {
          $addToSet: {
            books: book._id,
          },
        });
        if (!book) {
          return res.json({
            message: "Thêm sản phẩm thất bại.",
          });
        }
        return res.json({
          message: "Thêm sản phẩm thành công.",
          data: book,
        });
      });
  } catch ({ errors }) {
    return res.json({
      message: errors,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    await bookSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
        if (!book) {
          return res.json({
            message: "Cập sản phẩm thất bại.",
          });
        }
        return res.json({
          message: "Cập sản phẩm thành công.",
          data: book,
        });
      });
  } catch ({ errors }) {
    return res.json({
      message: errors,
    });
  }
};

const getBook = async (req, res) => {
  try {
    const books = await Book.findById(req.params.id)
      .populate("categoryId", "-createdAt -updatedAt -books")
      .populate({
        path: 'feedbacks',
        populate: {
          path: 'userId',
          model: 'User'
        }
      })
    if (!books) {
      return res.json({
        message: "Sản phẩm không tồn tại.",
      });
    }
    return res.json({
      message: "Chi tiết sản phẩm",
      data: books,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const removeBook = async (req, res) => {
  try {
    const books = await Book.findByIdAndUpdate(req.params.id, {
      isDelete: true,
    });
    if (!books) {
      return res.json({
        message: "Sản phẩm không tồn tại.",
      });
    }
    return res.json({
      message: "Xóa sản phẩm thành công.",
      data: books,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export { getBooks, createBook, updateBook, getBook, removeBook , searchBooks };
