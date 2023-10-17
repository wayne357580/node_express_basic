const { logger } = require(`../../../models/logger`)

module.exports = (req, res) => {    
    try {
        const { name } = req.params
        if (!name) {
            return res.status(200).json({
                'status': 'OK',
                'message': `Hi！Who are you？`
            })
        } else {
            return res.status(200).json({
                'status': 'OK',
                'message': `Hi, ${name}！`
            })
        }
    } catch (e) {
        logger.error(`/api/demo/get > ${e}`)
        return res.status(500).json({
            'status': 'ERROR',
            'message': 'Server error'
        })
    }
}