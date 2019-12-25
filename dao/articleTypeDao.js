'use strict';

const ArticleType = require('../models/articleType');
const MainDAO = require('./mainDao');

class ArticleTypeDAO {
    constructor() {
        this._mainDAO = new MainDAO();
    }

    get() {
        let query = "SELECT * FROM ArticleType";
        return this._mainDAO.all(query).then(rows => {
            let articleTypes = [];
            for (const row of rows) {
                articleTypes.push(this.createArticleType(row));
            }
            return articleTypes;
        });
    }

    createArticleType(row) {
        return new ArticleType(row.type_id,
            row.caption,
            row.image);
    }
}

module.exports = ArticleTypeDAO;