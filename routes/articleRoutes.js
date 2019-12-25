'use strict';
const express = require('express');
const router = express.Router();

const ArticleController = require("../controllers/articleController");
const articleController = new ArticleController();

router.get('/', function(req, res) {
    articleController.get(req, res);
});

router.get('/:id(\\d+)', function(req, res) {
    articleController.getById(req, res);
});

router.put('/', function(req, res) {
    articleController.put(req, res);
});

router.delete('/:id(\\d+)', function(req, res) {
    articleController.delete(req, res);
});

router.post('/:id(\\d+)', function(req, res) {
    articleController.post(req, res);
});

module.exports = router;
