class ArticleChange {
    constructor(articlechange_id,
        article_id,
        creation_date,
        quantity) {
            this.articlechange_id = articlechange_id;
            this.article_id = article_id;
            this.creation_date = creation_date;
            this.quantity = quantity;
        }
}

module.exports = ArticleChange;