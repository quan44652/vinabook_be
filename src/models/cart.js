import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cartItems: [
        {
            type: mongoose.Types.ObjectId,
            ref: "CartItem",
        }
    ]
},
    {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.model("Cart", cartSchema)