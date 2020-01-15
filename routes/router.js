const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');

router.use('/articles', require('./articleRoutes'));
router.use('/articles', require('./articleChangeRoutes'));
router.use('/articles', require('./articleTypeRoutes'));

router.post('/login', authentication.login);

module.exports = router;