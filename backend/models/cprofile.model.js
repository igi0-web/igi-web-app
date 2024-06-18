import mongoose from "mongoose";

const cprofileSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const CProfile = new mongoose.model("CProfile", cprofileSchema);

export default CProfile;