// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Define where to store the uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name conflicts
  }
});

const upload = multer({ storage });

module.exports = upload;
