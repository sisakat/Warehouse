'use strict';

const ArticleChange = require('../models/articleChange');
const MainDAO = require('./mainDao');

class ArticleChangeDAO {
    constructor() {
        this._mainDAO = new MainDAO();
    }

    get() {
        let query = "SELECT * FROM ArticleChange";
        return this._mainDAO.all(query).then(rows => {
            let articlesChanges = [];
            for (const row of rows) {
                articlesChanges.push(this.createArticleChange(row));
            }
            return articlesChanges;
        });
    }

    getByArticle(id) {
        let query = "SELECT * FROM ArticleChange WHERE article_id = $id";
        let params = {$id: id};
        return this._mainDAO.all(query, params).then(rows => {
            let articlesChanges = [];
            for (const row of rows) {
                articlesChanges.push(this.createArticleChange(row));
            }
            return articlesChanges;
        });
    }

    createArticleChange(row) {
        return new ArticleChange(row.articlechange_id,
            row.article_id,
            row.creation_date,
            row.quantity);
    }
}

module.exports = ArticleChangeDAO;