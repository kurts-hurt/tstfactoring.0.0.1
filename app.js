const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Middleware to serve static files (CSS, etc.)
app.use(express.static("public"));

// Create a folder for uploaded files
const fs = require("fs");
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Handle form submissions and file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const { name, email } = req.body;
  console.log("User Info:", name, email);
  console.log("Uploaded File:", req.file);

  res.send("File uploaded successfully.");
});

// Start server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
