const express = require('express');
const router = express.Router();

router.route('/')
    .get(require('./controller/get'))
    .post(require('./controller/post'))
    .put(require('./controller/put'))
    .delete(require('./controller/delete'))

module.exports = router