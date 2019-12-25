const express = require('express');
const router = express.Router();

router.use('/articles', require('./articleRoutes'));

module.exports = router;