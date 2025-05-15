 

 import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // stores file in memory as Buffer
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: limit size
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Unsupported file type"), false);
    }
    cb(null, true);
  },
});
