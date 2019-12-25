'use strict';
const express = require('express');
const router = express.Router();

const ArticleChangeController = require("../controllers/articleChangeController");
const articleChangeController = new ArticleChangeController();

router.get('/', function(req, res) {
    articleChangeController.get(req, res);
});

router.get('/:id', function(req, res) {
    articleChangeController.getByArticle(req, res);
});

module.exports = router;
