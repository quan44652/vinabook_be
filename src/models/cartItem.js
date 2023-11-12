import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        default: 0,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.model("CartItem", cartItemSchema)