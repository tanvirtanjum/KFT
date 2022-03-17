// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const subjectsService = require("../services/subjects.service");

exports.getAllSubjects = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        subjectsService.getAllSubjects(data, (error, results) => {
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
        designationsService.postNotice(data, (error, results) => {
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
        designationsService.deleteNotice(data, (error, results) => {
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

exports.updateNotice = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'title' : req.body.title,
        'details' : req.body.details,
        'dead_line' : req.body.dead_line,
    };

    if(data.id <= 0) {
        validated = false;
    }

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
        designationsService.updateNotice(data, (error, results) => {
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