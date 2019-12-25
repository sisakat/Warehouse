const database = require('../config/dbconfig');
const DbError = require('./dbError');

class MainDAO {
    all(query) {
        return new Promise(function (resolve, reject) {
            database.db.all(query, function (err, rows) {
                if (err) {
                    reject(
                        new DbError(20, "Internal Server Error")
                    );
                } else if (rows === null ||rows.length === 0) {
                    reject(
                        new DbError(21, "Entity not found")
                    );
                } else {
                    resolve(rows);
                }
            })
        });
    }

    first(query, params) {
        return new Promise(function(resolve, reject) {
            let statement = database.db.prepare(query);
            statement.all(params, function(err, rows) {
                if (err) {
                    reject(
                        new DbError(11, "Invalid arguments")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject (
                        new DbError(21, "Entity not found")
                    );
                } else {
                    let row = rows[0];
                    resolve(row);
                }
            });
        });
    }

    exists(query, params) {
        return new Promise(function(resolve, reject) {
            let statement = database.db.prepare(query);
            statement.each(params, function(err, rows) {
                if (err) {
                    reject(
                        new DbError(11, "Invalid arguments")
                    );
                } else if (rows === null || rows.length === 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    run(query, params) {
        return new Promise(function(resolve, reject) {
            let statement = database.db.prepare(query);
            statement.run(params, function(err, rows) {
                if (this.changes === 1) {
                    resolve(true);
                } else if (this.changes === 0) {
                    reject(new DbError(21, "Entity not found"));
                } else {
                    console.log(err);
                    reject(
                        new DbError(11, "Invalid arguments")
                    );
                }
            });
        });
    }
}

module.exports = MainDAO;