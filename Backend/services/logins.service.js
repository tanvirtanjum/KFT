const db = require("../config/db.config");

exports.getUser = (data, callback) => {
    db.query(
        `SELECT * FROM logins WHERE email = ? AND password = ?;`,
        [data.email, data.password],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};