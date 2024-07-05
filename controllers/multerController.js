const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Define a custom filter function to accept any file type
const fileFilter = (req, file, cb) => {
  // Accept any file
  cb(null, true);
};

// Multer configuration with custom filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10 MB
  fileFilter: fileFilter // Use the custom file filter
});

// Middleware for handling single file upload
const uploadSingle = upload.single('myFile');

// Middleware for handling multiple file upload
const uploadMultiple = upload.array('myFiles', 5);

function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while uploading the file'
    });
  }
  next();
}

// Function to upload a single file
function uploadFile(req, res, next) {
  uploadSingle(req, res, function (err) {
    if (err) {
      return next(err);
    }

    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }

    res.status(200).json({
      success: true,
      profile_url: `http://localhost:3000/images/${req.file.filename}`,
      file: req.file
    });
  });
}

// Function to get a single image
function getSingleImage(req, res) {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, `../upload/images/${imageName}`));
}

// Function to upload multiple files
function uploadMultipleFiles(req, res, next) {
  uploadMultiple(req, res, function (err) {
    if (err) {
      return next(err);
    }

    const files = req.files;
    if (!files || files.length === 0) {
      const error = new Error('Please upload at least one file');
      error.httpStatusCode = 400;
      return next(error);
    }

    const fileUrls = files.map(file => `http://localhost:3000/images/${file.filename}`);
    res.status(200).json({
      success: true,
      files: fileUrls
    });
  });
}

// Function to process a CSV file
function processCSV(req, res) {
  const users = [];

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", function (row) {
      const user = {
        name: row.name,
        email: row.email,
        password: row.password
      };
      users.push(user);
    })
    .on("end", function () {
      res.status(200).json({ success: true, users: users });
    })
    .on("error", function (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error processing CSV' });
    });
}

module.exports = {
  handleMulterError,
  uploadFile,
  getSingleImage,
  uploadMultipleFiles,
  processCSV
};
