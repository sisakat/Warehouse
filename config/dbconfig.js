let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./warehouse.db');

let init = function() {
    db.run("CREATE TABLE IF NOT EXISTS Article (" +
        "article_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "caption TEXT," +
        "description TEXT," +
        "creation_date DATE," +
        "quantity INT," +
        "gtin TEXT," +
        "storage TEXT" +
        ")");

    //db.run("INSERT INTO Article (caption, description, creation_date, quantity, gtin, storage) "+
    //" values ('Test2', 'test2', '2019-12-23', 5, '123456', 'A') ");
};

module.exports = {
    init: init,
    db: db
};