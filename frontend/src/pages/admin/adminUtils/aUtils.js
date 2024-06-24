import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase.js";


export const deleteImageFromFirebase = async (imageUrl) => {
    try {
        // Extract file path from URL
        const filePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
        const imageRef = ref(storage, filePath);
        await deleteObject(imageRef);
        console.log("Image deleted successfully");
    } catch (error) {
        console.error("Error deleting image:", error.message);
        throw error;
    }
};