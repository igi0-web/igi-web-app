import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    blurhash: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const News = new mongoose.model("News",newsSchema);

export default News;