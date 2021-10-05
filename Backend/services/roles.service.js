const db = require("../config/db.config");

exports.getAllRoles = (data, callback) => {
    db.query(
        "SELECT * from `roles` ORDER BY `id`;",
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};