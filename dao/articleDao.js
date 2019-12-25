'use strict';

const Article = require('../models/article');
const MainDAO = require('./mainDao');

class ArticleDAO {
    constructor() {
        this._mainDAO = new MainDAO();
    }

    get() {
        let query = "SELECT a.*, " +
            "(select caption from ArticleType where type_id = a.type_id) type_caption " +
            "FROM Article a";

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
                        "storage," +
                        "type_id," +
                        "(select caption from ArticleType where type_id = a.type_id) type_caption " +
                        "FROM Article a WHERE article_id = $id";
        let params = {$id: id};
        return this._mainDAO.first(query, params).then(row =>
            this.createArticle(row));
    }

    put(article) {
        let query = "INSERT INTO Article (" +
            "caption, description, quantity, gtin, storage, type_id" +
            ") VALUES (" +
            "$caption, $description, $quantity, $gtin, $storage, $type_id" +
            ")";
        let params = {
            $caption: article.caption,
            $description: article.description,
            $quantity: article.quantity,
            $gtin: article.gtin,
            $storage: article.storage,
            $type_id: article.type_id
        };

        return this._mainDAO.run(query, params);
    }

    delete(id) {
        let query = "DELETE FROM Article WHERE article_id = $id";
        let params = {$id: id};
        return this._mainDAO.run(query, params);
    }

    post(article) {
        let query = "UPDATE Article SET " + 
            "caption = $caption," +
            "description = $description, " + 
            "quantity = $quantity, " +
            "gtin = $gtin, " +
            "storage = $storage," +
            "type_id = $type_id " +
            "WHERE article_id = $article_id";

        let params = {
            $caption: article.caption,
            $description: article.description,
            $quantity: article.quantity,
            $gtin: article.gtin,
            $storage: article.storage,
            $article_id: article.articleId,
            $type_id: article.type_id
        };

        return this._mainDAO.run(query, params);
    }

    createArticle(row) {
        let a = new Article(row.article_id,
            row.caption,
            row.description,
            row.creation_date,
            row.quantity,
            row.gtin,
            row.storage,
            row.type_id);
        if (row.type_caption) {
            a.type_caption = row.type_caption;
        }
        return a;
    }
}

module.exports = ArticleDAO;