const db = require("../config/db.config");

exports.getUser = (data, callback) => {
    db.query(
        `SELECT * FROM logins WHERE email = ? AND password = BINARY ?;`,
        [data.email, data.password],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.getUserPassword = (data, callback) => {
    db.query(
        `SELECT logins.*, access.access_name FROM logins INNER JOIN access ON logins.access_id = access.id WHERE logins.email = ?;`,
        [data.email],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.updateUserPassword = (data, callback) => {
    db.query(
        `UPDATE logins SET password = ?, updated_at = current_timestamp WHERE id = ?; SELECT * FROM logins WHERE id = ?;`,
        [data.password, data.id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};