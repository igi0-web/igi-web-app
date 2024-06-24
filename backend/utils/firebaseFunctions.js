import fs from 'fs/promises';
import admin from "firebase-admin"
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
};
const jsonFilePath = './igi-leb-8245c-firebase-adminsdk-m4wg4-817b2e990c.json';
const serviceAccount = await readJsonFile(jsonFilePath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://igi-leb-8245c.appspot.com", 
});





const storage = admin.storage();
export {storage}

export const deleteImageFromFirebase = async (imageUrl) => {
    try {
      // Extract file path from URL
      const filePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
      
      // Get a reference to the storage service using the default bucket
      const bucket = admin.storage().bucket();
  
      // Delete the file from storage
      await bucket.file(filePath).delete();
  
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error.message);
      throw error;
    }
  };