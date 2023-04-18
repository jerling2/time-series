const express = require('express');
const file = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

file.post('/', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file, req.body)
});

module.exports = file;