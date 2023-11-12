import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cartItems: [
        {
            type: mongoose.Types.ObjectId,
            ref: "CartItem",
        }
    ],
    status: {
        type: String,
        required: true,
        default: "1"
    }
},
    {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.model("Order", orderSchema)