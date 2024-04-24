const multer  = require('multer')
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
    },
  
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    },
  
});
const upload = multer({storage: storage})

module.exports = {upload}