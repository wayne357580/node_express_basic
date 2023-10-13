const { logger } = require(`../../../models/logger`)

module.exports = (req, res) => {
    try {
        logger.info('GET request get success')
        return res.status(200).json({
            'status': 'OK',
            'message': 'GET request success'
        })
    } catch (e) {
        logger.error(`/api/demo/get > ${e}`)
        return res.status(400).json({
            'status': 'ERROR',
            'message': 'Server error'
        })
    }
}