const { logger } = require(`../../../models/logger`)

module.exports = (req, res) => {
    try {
        logger.info('PUT request success')
        return res.status(204).json({
            'status': 'OK',
            'message': 'PUT request success'
        })
    } catch (e) {
        logger.error(`/api/demo/put > ${e}`)
        return res.status(400).json({
            'status': 'ERROR',
            'message': 'Server error'
        })
    }
}