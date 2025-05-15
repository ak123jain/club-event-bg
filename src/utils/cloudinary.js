 import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error("⚠️ Cloudinary upload error:", error)
          reject(error)
        } else {
          console.log("✅ Cloudinary upload success:", result.secure_url)
          resolve(result)
        }
      }
    )

    streamifier.createReadStream(fileBuffer).pipe(uploadStream)
  })
}

export { uploadOnCloudinary }
