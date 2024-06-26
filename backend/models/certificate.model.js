import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
})

const Certificate = new mongoose.model("Certificate", certificateSchema);

export default Certificate;