'use strict';

const Article = require('../models/article');
const MainDAO = require('./mainDao');

class ArticleDAO {
    constructor() {
        this._mainDAO = new MainDAO();
    }

    get() {
        let query = "SELECT * FROM Article";
        return this._mainDAO.all(query).then(rows => {
            let articles = [];
            for (const row of rows) {
                articles.push(this.createArticle(row));
            }
            return articles;
        });
    }

    getById(id) {
        let query = "SELECT article_id, "+
                        "caption, " +
                        "description, " +
                        "creation_date, " +
                        "quantity, " +
                        "gtin," +
                        "storage " +
                        "FROM Article WHERE article_id = $id";
        let params = {$id: id};
        return this._mainDAO.first(query, params).then(row =>
            this.createArticle(row));

    }

    put(article) {
        let query = "INSERT INTO Article (" +
            "caption, description, quantity, gtin, storage" +
            ") VALUES (" +
            "$caption, $description, $quantity, $gtin, $storage" +
            ")";
        let params = {
            $caption: article.caption,
            $description: article.description,
            $quantity: article.quantity,
            $gtin: article.gtin,
            $storage: article.storage
        };

        return this._mainDAO.run(query, params);
    }

    delete(id) {
        let query = "DELETE FROM Article WHERE article_id = $id";
        let params = {$id: id};
        return this._mainDAO.run(query, params);
    }

    createArticle(row) {
        return new Article(row.article_id,
            row.caption,
            row.description,
            row.creation_date,
            row.quantity,
            row.gtin,
            row.storage);
    }
}

module.exports = ArticleDAO;