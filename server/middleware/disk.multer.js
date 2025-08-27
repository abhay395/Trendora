import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Files will be stored in /uploads
    },
    filename: (req, file, cb) => {
        // Create unique file name: timestamp-originalName
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
