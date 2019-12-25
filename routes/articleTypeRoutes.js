'use strict';
const express = require('express');
const router = express.Router();

const ArticleTypeController = require("../controllers/articleTypeController");
const articleTypeController = new ArticleTypeController();

router.get('/types', function(req, res) {
    articleTypeController.get(req, res);
});

module.exports = router;
