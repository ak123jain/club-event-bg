

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
    cb(null, 'akash.jpg') // Hardcoded filename (for now)
  }
})

export const upload = multer({ storage })
