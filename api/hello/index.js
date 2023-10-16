const express = require('express');
const router = express.Router();

router.get('/:name', require('./controller/get'))
router.post('/:name', require('./controller/post'))

module.exports = router