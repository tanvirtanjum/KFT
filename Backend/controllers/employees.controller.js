// Importing System Library Modules
const validator = require('validator');
var fs = require('fs');

// Importing Created Modules
const employeesService = require("../services/employees.service");

exports.getAllEmployees = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        employeesService.getAllEmployees(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getEmployee = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        employeesService.getEmployee(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getEmployeeByName = (req, res, next) => {
    var validated = true;
    const data = {
        'name' : "%"+req.params.name+"%",
    };

    if(validated){
        employeesService.getEmployeeByName(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.postNotice = (req, res, next) => {
    var validated = true;
    const data = {
        'title' : req.body.title,
        'details' : req.body.details,
        'dead_line' : req.body.dead_line,
    };

    if(validator.isEmpty(data.title , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.details , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isDate(data.dead_line, {format: 'MM/DD/YYYY'})) {
        validated = false;
    }

    if(validated){
        admission_noticeService.postNotice(data, (error, results) => {
            if (error) {
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(201).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.deleteNotice = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validated){
        employeesService.deleteNotice(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(204).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.updateEmployee = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'name' : req.body.name,
        'father_name' : req.body.father_name,
        'mother_name' : req.body.mother_name,
        'contact' : req.body.contact,
        'sex' : req.body.sex,
        'bg' : req.body.bg,
        'religion' : req.body.religion,
        'present_address' : req.body.present_address,
        'permanent_address' : req.body.permanent_address,
        'salary' : req.body.salary,
        'designation_id' : req.body.designation_id,
        'file_no' : req.body.file_no,
        'employment_status_id' : req.body.employment_status_id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.father_name , {ignore_whitespace: true})) {
        validated = false;
    }
    
    if(validator.isEmpty(data.mother_name, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.contact, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.sex, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.bg, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.religion, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.present_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.permanent_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.salary, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.designation_id, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.employment_status_id, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        employeesService.updateEmployee(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(200).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};


exports.updateEmployeeImage = (req, res, next) => {
    var validated = true;

    if(req.file == null) {
        validated = false;
    }

    if(validated){
        const data = {
            'id' : req.params.id,
            'img_path': req.file.path,
        };
        employeesService.updateEmployeeImage(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                try {
                    fs.unlinkSync(req.header("path"))
                    //file removed
                } 
                catch(err) {
                    console.error(err)
                }
                return res.status(200).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};