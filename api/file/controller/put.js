const { logger } = require(`../../../models/logger`)

const sanitize = require("sanitize-filename");
const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
    try {
        let { fileName } = req.params
        fileName = sanitize(fileName)
        let { newName } = req.query
        newName = sanitize(newName)

        if (!fileName) {
            return res.status(400).json({
                status: 'ERROR',
                message: `Unknown file name`
            })
        } else if (!newName) {
            return res.status(400).json({
                status: 'ERROR',
                message: `Missing parameters ['newName']`
            })
        } else {
            let folderPath = path.join(__dirname, '../../..', process.env.FILE_FOLDER || 'public/files')
            if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true })
            let filePath = path.join(folderPath, fileName)
            let newPath = path.join(folderPath, newName)
            if (fs.existsSync(filePath)) {
                fs.renameSync(filePath, newPath)
                return res.status(200).json({
                    status: 'OK',
                    message: `Rename file [${fileName}] to [${newName}]`
                })
            } else {
                return res.status(400).json({
                    status: 'ERROR',
                    message: `File isn't exist : ${fileName}`
                })
            }
        }
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: `Server error`
        })
    }
}