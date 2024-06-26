import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
    },
    country: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Project = new mongoose.model("Project", projectSchema);

export default Project;