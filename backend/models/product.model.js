import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const Category = new mongoose.model("Category", productCategorySchema);

const productSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    blurhash: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features:{
        type: String,
        required: true 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    }
}, {
    timestamps: true
})

export const Product = new mongoose.model("Product", productSchema);