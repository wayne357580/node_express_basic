const { logger } = require(`../../../models/logger`)

module.exports = (req, res) => {
    try {
        logger.info('DELETE request success')
        return res.status(204).json({
            'status': 'OK',
            'message': 'DELETE request success'
        })
    } catch (e) {
        logger.error(`/api/demo/delete > ${e}`)
        return res.status(500).json({
            'status': 'ERROR',
            'message': 'Server error'
        })
    }
}