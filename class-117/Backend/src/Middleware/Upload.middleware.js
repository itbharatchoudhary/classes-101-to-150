const multer = require("multer");

const storage = multer.memoryStorage();

/**
 * multer configuration for file upload
 * limits: file size should not exceed 9MB
 * storage: memory storage (files will be stored in memory as Buffer objects)
 * 
 */
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 9
    }
})

module.exports = upload;