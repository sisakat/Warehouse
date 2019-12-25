class Article {
    constructor(articleId, 
            caption, 
            description, 
            creationDate, 
            quantity, 
            gtin, 
            storage) {
        this.articleId = articleId;
        this.caption = caption;
        this.description = description;
        this.creationDate = creationDate;
        this.quantity = quantity;
        this.gtin = gtin;
        this.storage = storage;
    }
}

module.exports = Article;