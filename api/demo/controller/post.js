const { logger } = require(`../../../models/logger`)

module.exports = (req, res) => {
    try {
        logger.info('POST request success')
        return res.status(201).json({
            'status': 'OK',
            'message': 'POST request success'
        })
    } catch (e) {
        logger.error(new Error(e.stack).stack)
        return res.status(500).json({
            'status': 'ERROR',
            'message': 'Server error'
        })
    }
}