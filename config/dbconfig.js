let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./warehouse.db');

let init = function() {
    db.run("DROP TABLE IF EXISTS ArticleType", function(err) {
        db.run("CREATE TABLE IF NOT EXISTS ArticleType (" +
        "type_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "caption TEXT," +
        "image TEXT" +
        ")", function(err) {
            db.run("INSERT INTO ArticleType (caption, image) VALUES ('Sweets', 'types_sweets.svg')");
            db.run("INSERT INTO ArticleType (caption, image) VALUES ('Cereal', 'types_cereal.svg')");
            db.run("INSERT INTO ArticleType (caption, image) VALUES ('Grain', 'types_grain.svg')");
            db.run("INSERT INTO ArticleType (caption, image) VALUES ('Technology', 'types_technology.svg')");
            db.run("INSERT INTO ArticleType (caption, image) VALUES ('Tools', 'types_tools.svg')");
            db.run("INSERT INTO ArticleType (caption, image) VALUES ('Vegetables', 'types_vegetables.svg')");
            db.run("INSERT INTO ArticleType (caption, image) VALUES ('Household', 'types_household.svg')");
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