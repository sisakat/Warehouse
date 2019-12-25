class Article {
    constructor(articleId, 
            caption, 
            description, 
            creationDate, 
            quantity, 
            gtin, 
            storage,
            type_id) {
        this.articleId = articleId;
        this.caption = caption;
        this.description = description;
        this.creationDate = creationDate;
        this.quantity = quantity;
        this.gtin = gtin;
        this.storage = storage;
        this.type_id = type_id;
        this.type_caption = "";
    }
}

module.exports = Article;