const express = require('express');
const router = express.Router();

router.use('/articles', require('./articleRoutes'));
router.use('/articles', require('./articleChangeRoutes'));

module.exports = router;