const { logger } = require(`../../../models/logger`)
const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
    try {
        const { fileName } = req.params
        if (!fileName) {
            return res.status(400).json({
                status: 'ERROR',
                message: `Unknown file name`
            })
        } else {
            let folderPath = path.join(__dirname, '../../..', process.env.FILE_FOLDER || 'public/files')
            if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true })
            let filePath = path.join(folderPath, fileName)

            if (fs.existsSync(filePath)) {
                return res.status(200).download(filePath)
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