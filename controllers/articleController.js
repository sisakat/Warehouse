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
}

module.exports = ArticleController;