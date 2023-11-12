import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        required: true
    },

    isDelete: {
        type: Boolean,
        default: false,
        required: true
    },
    feedbacks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback",
            autopopulate: true,
        }
    ],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        autopopulate: true,
    },
}, { timestamps: true, versionKey: false })

bookSchema.plugin(mongoosePaginate)

export default mongoose.model("Book", bookSchema)