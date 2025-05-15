//  import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })
  
// export const upload = multer({ 
//     storage, 
// })


import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve("./public/temp");

    try {
      // Ensure the folder exists
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log(`📁 Created upload directory at: ${uploadPath}`);
      }

      cb(null, uploadPath);
    } catch (error) {
      console.error("❌ Error setting upload destination:", error);
      cb(error, uploadPath); // Forward the error to multer
    }
  },

  filename: function (req, file, cb) {
    try {
      const safeName = file.originalname.replace(/\s+/g, "_");
      console.log(`📄 Saving file as: ${safeName}`);
      cb(null, safeName);
    } catch (error) {
      console.error("❌ Error setting filename:", error);
      cb(error, file.originalname);
    }
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Optional: Add logging for allowed file types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      console.warn(`⚠️ Upload rejected. Unsupported file type: ${file.mimetype}`);
      return cb(new Error("Unsupported file type"), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});
