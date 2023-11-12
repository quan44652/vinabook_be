import Books from "../models/books";
import Category from "../models/category";
import { categorySchema } from "../schemas/category";

const getAllCategory = async (req,res) => {
    try {
        const category =  await Category.find()
        const newCategory = category.filter((item) => item.isDelete == false)

            return res.json({
                message: "Danh sách danh mục",
                data: newCategory
            })
     
    } catch (error) {
        return res.json({
            message: error
        })
    }
}

const createCategory = async (req,res) =>  {
    try {
        await categorySchema.validate(req.body,{abortEarly: false}).then( async() => {
            const category = await Category.create(req.body);
            if(!category) {
                return res.json({
                    message: "Thêm sản danh mục thất bại"
                })
            }
            return res.json({
                message: "Thêm sản danh mục thành công.",
                data: category
            })
        })
    } catch ({errors}) {
        return res.json({
            message: errors
        })
    }
}

const updateCategory = async (req,res) =>  {
    try {
        await categorySchema.validate(req.body,{abortEarly: false}).then( async() => {
            const category = await Category.findByIdAndUpdate(req.params.id,req.body);
            if(!category) {
                return res.json({
                    message: "Cập nhập sản danh mục thất bại"
                })
            }
            return res.json({
                message: "Cập nhập sản danh mục thành công.",
                data: category
            })
        })
    } catch ({errors}) {
        return res.json({
            message: errors
        })
    }
}

const getCategory = async (req,res) => {
    try {
        const category =  await Category.findById(req.params.id).populate("books","-feedbacks -updatedAt")
        if(category) {
            return res.json({
                message: "Chi tiết danh mục",
                data: category
            })
        }
    } catch (error) {
        return res.json({
            message: error
        })
    }
}

const removeCategory = async (req,res) => {
    try {
        const category =  await Category.findByIdAndUpdate(req.params.id ,{
            isDelete: true
        })
        if(!category) {
            return res.json({
                message: "Danh mục không tồn tại"
            })
        }
        return res.json({
            message: "Xóa danh mục thành công",
            data: category
        })
    } catch (error) {
        return res.json({
            message: error
        })
    }
}



export {getAllCategory , createCategory , updateCategory , getCategory , removeCategory}