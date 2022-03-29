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

exports.postCourse = (data, callback) => {
    db.query(
        `INSERT INTO section_courses(section_id, subject_id, class_timing, teacher_id) VALUES (?, ?, ?, ?);`,
        [data.section_id, data.subject_id, data.class_timing, data.teacher_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateSection = (data, callback) => {
    db.query(
        `UPDATE academic_session_sections SET section_name = ?, class_id = ?, group_id = ?, wing_id = ?, class_teacher_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.section_name, data.class_id, data.group_id, data.wing_id, data.class_teacher_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};