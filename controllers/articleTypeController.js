'use strict';

const ArticleTypeDao = require('../dao/articleTypeDao');
const MainController = require('./mainController');

class ArticleTypeController {
    constructor() {
        this._articleTypeDao = new ArticleTypeDao();
        this._mainController = new MainController();
    }

    get(req, res) {
        this._articleTypeDao.get()
            .then(this._mainController.findSuccess(res))
            .catch(this._mainController.findError(res));
    }
}

module.exports = ArticleTypeController;