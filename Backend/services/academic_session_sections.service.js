const db = require("../config/db.config");

exports.getSectionsBySession = (data, callback) => {
    db.query(
        `SELECT academic_session_sections.*, classes.class_name, groups.group_name, wings.wing_name, teachers.name FROM academic_session_sections `+
        `INNER JOIN classes ON academic_session_sections.class_id = classes.id `+
        `INNER JOIN groups ON academic_session_sections.group_id = groups.id `+
        `INNER JOIN wings ON academic_session_sections.wing_id = wings.id `+
        `INNER JOIN teachers ON academic_session_sections.class_teacher_id = teachers.id `+
        `WHERE academic_session_sections.session_id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postSession = (data, callback) => {
    db.query(
        `INSERT INTO academic_sessions(year_name, session_status_id) VALUES (?, ?);`,
        [data.year_name, data.session_status_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateSession = (data, callback) => {
    db.query(
        `UPDATE academic_sessions SET year_name = ?, session_status_id = ? WHERE id = ?;`,
        [data.year_name, data.session_status_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};