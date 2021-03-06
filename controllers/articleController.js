'use strict';

const ArticleDao = require('../dao/articleDao');
const MainController = require('./mainController');
const Article = require('../models/article');

class ArticleController {
    constructor() {
        this._articleDao = new ArticleDao();
        this._mainController = new MainController();
    }

    get(req, res) {
        this._articleDao.get()
            .then(this._mainController.findSuccess(res))
            .catch(this._mainController.findError(res));
    }

    getById(req, res) {
        let id = req.params.id;
        this._articleDao.getById(id)
            .then(this._mainController.findSuccess(res))
            .catch(this._mainController.findError(res));
    }

    put(req, res) {
        let article = req.body;
        this._articleDao.put(article)
            .then(this._mainController.findSuccess(res))
            .catch(this._mainController.findError(res));
    }

    delete(req, res) {
        this._articleDao.delete(req.params.id)
            .then(this._mainController.findSuccess(res))
            .catch(this._mainController.findError(res));
    }

    post(req, res) {
        let article = req.body;
        this._articleDao.post(article)
            .then(this._mainController.findSuccess(res))
            .catch(this._mainController.findError(res));
    }
}

module.exports = ArticleController;