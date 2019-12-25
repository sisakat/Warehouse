'use strict';
const express = require('express');
const router = express.Router();

const ArticleController = require("../controllers/articleController");
const articleController = new ArticleController();

router.get('/', function(req, res) {
    articleController.get(req, res);
});

router.get('/:id', function(req, res) {
    articleController.getById(req, res);
});

module.exports = router;
