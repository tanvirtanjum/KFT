// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const section_coursesService = require("../services/section_courses.service");


exports.getCourse = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        section_coursesService.getCourse(data, (error, results) => {
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

exports.getCoursesBySection = (req, res, next) => {
    var validated = true;
    const data = {
        'section_id' : req.params.id,
    };

    if(validated){
        section_coursesService.getCoursesBySection(data, (error, results) => {
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

exports.postSection = (req, res, next) => {
    var validated = true;
    const data = {
        'section_name' : req.body.section_name,
        'class_id' : req.body.class_id,
        'group_id' : req.body.group_id,
        'wing_id' : req.body.wing_id,
        'session_id' : req.body.session_id,
        'class_teacher_id' : req.body.class_teacher_id,
    };

    if(validator.isEmpty(data.section_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        academic_session_sectionsService.postSection(data, (error, results) => {
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

exports.updateSection = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'section_name' : req.body.section_name,
        'class_id' : req.body.class_id,
        'group_id' : req.body.group_id,
        'wing_id' : req.body.wing_id,
        'class_teacher_id' : req.body.class_teacher_id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.section_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        academic_session_sectionsService.updateSection(data, (error, results) => {
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