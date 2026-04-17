import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "INR", "JPY", "GBP"],
            default: "INR"
        }
    },
    images: [
        {
            url: String
        }
    ]
}, { timestamps: true });

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
