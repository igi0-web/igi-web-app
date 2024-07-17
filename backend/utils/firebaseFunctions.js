import fs from 'fs/promises';
import admin from "firebase-admin"
// const readJsonFile = async (filePath) => {
//   try {
//     const data = await fs.readFile(filePath, 'utf-8');
//     const jsonData = JSON.parse(data);
//     return jsonData;
//   } catch (error) {
//     console.error('Error reading JSON file:', error);
//     throw error;
//   }
// };
// const jsonFilePath = './igi-leb-8245c-firebase-adminsdk-m4wg4-817b2e990c.json';



const serviceAccount = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id, 
  private_key: process.env.private_key.replace(/\\n/g, '\n'),
  client_email: process.env.client_email,
  client_id: process.env.client_id, 
  auth_uri: process.env.auth_uri, 
  token_uri: process.env.token_uri, 
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url, 
  client_x509_cert_url: process.env.client_x509_cert_url, 
  universe_domain: process.env.universe_domain 
};



// const serviceAccount = await readJsonFile(jsonFilePath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://igi-leb-8245c.appspot.com", 
});

const storage = admin.storage();
export {storage}

export const deleteImageFromFirebase = async (imageUrl) => {
    try {
     
      const filePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
      
    
      const bucket = admin.storage().bucket();
  
  
      await bucket.file(filePath).delete();
  
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error.message);
      throw error;
    }
  };