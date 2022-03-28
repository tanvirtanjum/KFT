const db = require("../config/db.config");


exports.getSection = (data, callback) => {
    db.query(
        `SELECT academic_session_sections.*, classes.class_name, groups.group_name, wings.wing_name, teachers.name FROM academic_session_sections `+
        `INNER JOIN classes ON academic_session_sections.class_id = classes.id `+
        `INNER JOIN groups ON academic_session_sections.group_id = groups.id `+
        `INNER JOIN wings ON academic_session_sections.wing_id = wings.id `+
        `INNER JOIN teachers ON academic_session_sections.class_teacher_id = teachers.id `+
        `WHERE academic_session_sections.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getSectionsBySession = (data, callback) => {
    db.query(
        `SELECT academic_session_sections.*, classes.class_name, groups.group_name, wings.wing_name, teachers.name FROM academic_session_sections `+
        `INNER JOIN classes ON academic_session_sections.class_id = classes.id `+
        `INNER JOIN groups ON academic_session_sections.group_id = groups.id `+
        `INNER JOIN wings ON academic_session_sections.wing_id = wings.id `+
        `INNER JOIN teachers ON academic_session_sections.class_teacher_id = teachers.id `+
        `WHERE academic_session_sections.session_id = ?; `,
        [data.session_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postSection = (data, callback) => {
    db.query(
        `INSERT INTO academic_session_sections(section_name, class_id, group_id, wing_id, session_id, class_teacher_id) VALUES (?, ?, ?, ?, ?, ?);`,
        [data.section_name, data.class_id, data.group_id, data.wing_id, data.session_id, data.class_teacher_id],
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