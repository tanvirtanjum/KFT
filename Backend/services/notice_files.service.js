const db = require("../config/db.config");

exports.getAllFilesByNotice = (data, callback) => {
    db.query(
        `SELECT * FROM notice_files ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};