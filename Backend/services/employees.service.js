const db = require("../config/db.config");

exports.getAllEmployees = (data, callback) => {
    db.query(
        `SELECT employees.*, logins.email, logins.role_id, roles.role_name, designations.designation_name, employment_status.status_name FROM employees `+ 
        `INNER JOIN logins ON employees.login_id = logins.id `+
        `INNER JOIN roles ON logins.role_id = roles.id `+
        `INNER JOIN designations ON employees.designation_id = designations.id `+
        `INNER JOIN employment_status ON employees.employment_status_id = employment_status.id `+
        `ORDER BY employees.designation_id ASC; `,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getEmployee = (data, callback) => {
    db.query(
        `SELECT employees.*, logins.email, logins.role_id, roles.role_name, designations.designation_name, employment_status.status_name FROM employees `+ 
        `INNER JOIN logins ON employees.login_id = logins.id `+
        `INNER JOIN roles ON logins.role_id = roles.id `+
        `INNER JOIN designations ON employees.designation_id = designations.id `+
        `INNER JOIN employment_status ON employees.employment_status_id = employment_status.id `+
        `WHERE employees.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getEmployeeByName = (data, callback) => {
    db.query(
        `SELECT employees.*, logins.email, logins.role_id, roles.role_name, designations.designation_name, employment_status.status_name FROM employees `+ 
        `INNER JOIN logins ON employees.login_id = logins.id `+
        `INNER JOIN roles ON logins.role_id = roles.id `+
        `INNER JOIN designations ON employees.designation_id = designations.id `+
        `INNER JOIN employment_status ON employees.employment_status_id = employment_status.id `+
        `WHERE employees.name LIKE ?; `,
        [data.name],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postEmployee = (data, callback) => {
    db.query(
        `INSERT INTO employees(name, father_name, mother_name, contact, sex, bg, religion, present_address, permanent_address, salary, designation_id, img_path, file_no, login_id, employment_status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [data.name, data.father_name, data.mother_name, data.contact, data.sex, data.bg, data.religion, data.present_address, data.permanent_address, data.salary, data.designation_id, data.img_path, data.file_no, data.login_id, data.employment_status_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            console.log(data);
            return callback(null, results);
        }
    );
};

exports.deleteNotice = (data, callback) => {
    db.query(
        `DELETE FROM admission_notices WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateEmployee = (data, callback) => {
    db.query(
        `UPDATE employees SET name = ?, father_name = ?, mother_name = ?, contact = ?, sex = ?, bg = ?, religion = ?, present_address = ?, permanent_address = ?, salary = ?, designation_id = ?, file_no = ?, employment_status_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.name, data.father_name, data.mother_name, data.contact, data.sex, data.bg, data. religion, data.present_address, data.permanent_address, data.salary, data.designation_id, data.file_no, data.employment_status_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateEmployeeImage = (data, callback) => {
    db.query(
        `UPDATE employees SET img_path = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.img_path, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};