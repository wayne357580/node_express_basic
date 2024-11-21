const fs = require('fs')
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Save path
        let folderPath = path.join(__dirname, '../..', process.env.FILE_FOLDER || 'public/files')
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true })
        let filePath = path.join(__dirname, '../..', process.env.FILE_FOLDER || 'public/files', Buffer.from(file.originalname, 'binary').toString())
        if (fs.existsSync(filePath)) {
            cb('此檔案已上傳', null)
        } else {
            cb(null, folderPath);
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Buffer.from(file.originalname, 'binary').toString()}`)
    }
});

module.exports.upload = multer({
    storage,
    limits: { fileSize: Number(process.env.FILE_SIZE_LIMIT) || Infinity }
})


