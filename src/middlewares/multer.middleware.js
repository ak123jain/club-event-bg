import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})

 // middlewares/multer.middleware.js
// import multer from "multer";

// // Use memory storage instead of disk
// const storage = multer.memoryStorage();

// export const upload = multer({ storage });
