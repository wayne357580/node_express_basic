const express = require('express');
const router = express.Router();
const multer = require('multer')
const { logger } = require('../../models/logger')
const { upload } = require('../../models/middleware')

/* GET */
router.get('/', require('./controller/getList'))
router.get('/:fileName', require('./controller/get'))

/* POST */
// 不限制欄位
router.post('/', (req, res, next) => {
    upload.any()(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'ERROR',
                message: `Invalid file`
            })
        } else if (typeof (err) === 'string') {
            return res.status(400).json({
                status: 'ERROR',
                message: err
            })
        } else if (err) {
            logger.error(new Error(err.stack).stack)
            return res.status(500).json({
                status: 'ERROR',
                message: 'Server error'
            })
        } else {
            next()
        }
    })
}, require('./controller/post'))

// 限制單個檔案及欄位
router.post('/single', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Invalid file [max 1] or wrong form field [file]'
            })
        } else if (e) {
            logger.error(new Error(e.stack).stack)
            return res.status(500).json({
                status: 'ERROR',
                message: 'Server error'
            })
        } else {
            next()
        }
    })
}, require('./controller/post'))
// 限制檔案數量及欄位
router.post('/multiple', (req, res, next) => {
    let fileLimit = 5
    upload.array('file', fileLimit)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'ERROR',
                message: `Invalid file [max ${fileLimit}] or wrong form field [file]`
            })
        } else if (e) {
            logger.error(new Error(e.stack).stack)
            return res.status(500).json({
                status: 'ERROR',
                message: 'Server error'
            })
        } else {
            next()
        }
    })
}, require('./controller/post'))
// 僅限表單文字欄位
router.post('/text', (req, res, next) => {
    upload.none()(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'ERROR',
                message: `Invalid text form`
            })
        } else if (e) {
            logger.error(new Error(e.stack).stack)
            return res.status(500).json({
                status: 'ERROR',
                message: 'Server error'
            })
        } else {
            next()
        }
    })
}, require('./controller/post'))

/* PUT */
router.put('/:fileName', require('./controller/put'))

/* DELETE */
router.delete('/:fileName', require('./controller/delete'))

module.exports = router