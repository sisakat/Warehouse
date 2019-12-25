const express = require('express');
const router = express.Router();

router.use('/articles', require('./articleRoutes'));
router.use('/articleChange', require('./articleChangeRoutes'));

module.exports = router;