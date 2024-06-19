import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Certificate = new mongoose.model("Certificate", certificateSchema);

export default Certificate;