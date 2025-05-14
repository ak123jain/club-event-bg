// // import multer from "multer";

// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //       cb(null, "./public/temp")
// //     },
// //     filename: function (req, file, cb) {
      
// //       cb(null, file.originalname)
// //     }
// //   })
  
// // export const upload = multer({ 
// //     storage, 
// // })

// import multer from "multer";
// import fs from "fs";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = path.join(__dirname, "../public/temp");

//     // Create directory if it doesn't exist
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     cb(null, dir);
//   },
 
//   /**
//    * Use the original file name as the stored file name
//    * @function
//    * @param {Object} req - Express request object
//    * @param {Object} file - Multer file object
//    * @param {Function} cb - Callback to call with the file name
//    */
// /*******  76bac4fb-7ccd-4f18-8fc7-d494c9a0f0ac  *******/ 
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage });


import multer from "multer";

// Use memory storage instead of disk
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit (adjust if needed)
});
