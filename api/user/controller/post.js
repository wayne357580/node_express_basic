const { logger } = require(`../../../models/logger`)

module.exports = (req, res) => {
    try {
        const { name } = req.params
        const { age, gender } = req.body

        if (!name) {
            return res.status(200).json({
                'status': 'OK',
                'message': `Hi！Who are you？`
            })
        } else if (!age) {
            return res.status(200).json({
                'status': 'OK',
                'message': `Hi, ${name}！ How old are you？`
            })
        } else if (!gender) {
            return res.status(203).json({
                'status': 'OK',
                'message': `Hi, ${name}！ What is your gender？`
            })
        } else {
            return res.status(201).json({
                'status': 'OK',
                'message': `Hi, ${name}！Your age is ${age} and gender is ${gender}`
            })
        }
    } catch (e) {
        logger.error(`/api/demo/post > ${e}`)
        return res.status(400).json({
            'status': 'ERROR',
            'message': 'Server error'
        })
    }
}