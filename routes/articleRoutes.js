'use strict';
const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');

const ArticleController = require("../controllers/articleController");
const articleController = new ArticleController();

router.get('/', authentication.authenticate, function(req, res) {
    articleController.get(req, res);
});

router.get('/:id(\\d+)', authentication.authenticate, function(req, res) {
    articleController.getById(req, res);
});

router.put('/', authentication.authenticate, function(req, res) {
    articleController.put(req, res);
});

router.delete('/:id(\\d+)', authentication.authenticate, function(req, res) {
    articleController.delete(req, res);
});

router.post('/:id(\\d+)', authentication.authenticate, function(req, res) {
    articleController.post(req, res);
});

module.exports = router;
