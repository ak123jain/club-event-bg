// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) {
//             console.log("❌ No local file path provided. Skipping upload.");
//             return null;
//         }

//         // Log that upload is starting
//         console.log("🚀 Starting upload for local file path:", localFilePath);

//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         });

//         console.log("✅ File uploaded successfully to Cloudinary:", response.url);

//          fs.unlinkSync(localFilePath); // Delete the local file after upload    

//         return response;

//     } catch (error) {
//         console.error("⚠️ Error during file upload:", error);

//          fs.unlinkSync(localFilePath); // Delete the local file after upload failure

//         return null;
//     }
// };

// export { uploadOnCloudinary };

// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";

// export const uploadOnCloudinary = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "events" },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );

//     streamifier.createReadStream(fileBuffer).pipe(stream);
//   });
// };


import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });


  // Upload image to Cloudinary with circular transformation
 export  const uploadAvatar = (buffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
          transformation: [
            { width: 400, height: 400, crop: 'thumb', gravity: 'face' }, // crop to a square centered on the face
            { radius: 'max' }, // apply maximum corner rounding to make it circular
          ],
        }, (error, result) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        });
    
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    };