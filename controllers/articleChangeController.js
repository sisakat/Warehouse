'use strict';

const ArticleChangeDao = require('../dao/articleChangeDao');
const MainController = require('./mainController');

class ArticleChangeController {
    constructor() {
        this._articleChangeDao = new ArticleChangeDao();
        this._mainController = new MainController();
    }

    get(req, res) {
        this._articleChangeDao.get()
            .then(this._mainController.findSuccess(res))
            .catch(this._mainController.findError(res));
    }

    getByArticle(req, res) {
        let id = req.params.id;
        this._articleChangeDao.getByArticle(id)
            .then(this._mainController.findSuccess(res))
            .catch(this._mainController.findError(res));
    }
}

module.exports = ArticleChangeController;