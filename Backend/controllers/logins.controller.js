// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const loginsService = require("../services/logins.service");

exports.getUser = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
        'password' : req.body.password,
    };
    // Validation Code here
    if(!validator.isEmail(data.email)) {
        validated = false;
    }
    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        loginsService.getUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.getUserLogout = (req, res, next) => {
    req.header("role") = null;

    return res.status(200).send({ success: true, data: "User Logged Out." });
};