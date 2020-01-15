'use strict';
const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');

const ArticleChangeController = require("../controllers/articleChangeController");
const articleChangeController = new ArticleChangeController();

router.get('/changes', authentication.authenticate, function(req, res) {
    articleChangeController.get(req, res);
});

router.get('/:id(\\d+)/changes', authentication.authenticate, function(req, res) {
    articleChangeController.getByArticle(req, res);
});

module.exports = router;
