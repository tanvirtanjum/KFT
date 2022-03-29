const db = require("../config/db.config");


exports.getCourse = (data, callback) => {
    db.query(
        `SELECT section_courses.*, subjects.subject_name, teachers.name FROM section_courses `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN teachers ON section_courses.teacher_id = teachers.id `+
        `WHERE section_courses.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getCoursesBySection = (data, callback) => {
    db.query(
        `SELECT section_courses.*, subjects.subject_name, teachers.name FROM section_courses `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN teachers ON section_courses.teacher_id = teachers.id `+
        `WHERE section_courses.section_id = ?; `,
        [data.section_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getCourseBySession_Teacher = (data, callback) => {
    db.query(
        `SELECT section_courses.*, subjects.subject_name, teachers.name FROM section_courses `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN teachers ON section_courses.teacher_id = teachers.id `+
        `WHERE section_courses.section_id = ? AND section_courses.teacher_id = ?; `,
        [data.section_id, data.teacher_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postCourse = (data, callback) => {
    db.query(
        `INSERT INTO section_courses(session_id, section_id, subject_id, class_timing, teacher_id) VALUES (?, ?, ?, ?, ?);`,
        [data.session_id, data.section_id, data.subject_id, data.class_timing, data.teacher_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateCourse = (data, callback) => {
    db.query(
        `UPDATE section_courses SET subject_id = ?, class_timing = ?, teacher_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.subject_id, data.class_timing, data.teacher_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.deleteCourse = (data, callback) => {
    db.query(
        `DELETE FROM section_courses WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};