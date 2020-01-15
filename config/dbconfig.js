let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./warehouse.db');

let init = function() {
    db.run("DROP TABLE IF EXISTS ArticleType", function(err) {
        db.run("CREATE TABLE IF NOT EXISTS ArticleType (" +
        "type_id INTEGER PRIMARY KEY," +
        "caption TEXT," +
        "image TEXT" +
        ")", function(err) {
            db.run("INSERT INTO ArticleType (type_id, caption, image) VALUES (1, 'Sweets', 'types_sweets.svg')");
            db.run("INSERT INTO ArticleType (type_id, caption, image) VALUES (2, 'Cereal', 'types_cereal.svg')");
            db.run("INSERT INTO ArticleType (type_id, caption, image) VALUES (3, 'Grain', 'types_grain.svg')");
            db.run("INSERT INTO ArticleType (type_id, caption, image) VALUES (4, 'Technology', 'types_technology.svg')");
            db.run("INSERT INTO ArticleType (type_id, caption, image) VALUES (5, 'Tools', 'types_tools.svg')");
            db.run("INSERT INTO ArticleType (type_id, caption, image) VALUES (6, 'Vegetables', 'types_vegetables.svg')");
            db.run("INSERT INTO ArticleType (type_id, caption, image) VALUES (7, 'Household', 'types_household.svg')");
        });
    });

    db.run("CREATE TABLE IF NOT EXISTS Article (" +
        "article_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "caption TEXT," +
        "description TEXT," +
        "creation_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
        "quantity INT," +
        "gtin TEXT," +
        "storage TEXT, " +
        "type_id INT" +
        ")");

    db.run("CREATE TABLE IF NOT EXISTS ArticleChange (" +
        "articlechange_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "article_id INTEGER NOT NULL, " +
        "creation_date DATETIME DEFAULT CURRENT_TIMESTAMP, " +
        "quantity INT NOT NULL, " +
        "FOREIGN KEY (article_id) REFERENCES Article (article_id)" +
        ")");

    //db.run("INSERT INTO Article (caption, description, quantity, gtin, storage) "+
    //" values ('Test2', 'test2', 5, '123456', 'A') ");

    //db.run("INSERT INTO ArticleChange (article_id, quantity) values (1, -3)");
};

module.exports = {
    init: init,
    db: db
};
