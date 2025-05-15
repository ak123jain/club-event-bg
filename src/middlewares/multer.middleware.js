 import multer from 'multer'
import fs from 'fs'
import path from 'path'

const tempDir = path.join('public', 'temp')

// Ensure the folder exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    // Option 1: Keep original name
    cb(null, file.originalname)

    // Option 2 (safer): Make it unique
    // const uniqueName = `${Date.now()}-${file.originalname}`
    // cb(null, uniqueName)
  }
})

export const upload = multer({ storage })
