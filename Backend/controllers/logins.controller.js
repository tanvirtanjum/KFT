// Importing System Library Modules
const validator = require('validator');
const nodemailer = require('nodemailer');

// Importing Created Modules
const loginsService = require("../services/logins.service");

var transporter = nodemailer.createTransport({
    service: process.env.RECPASS_SERVICE,
    auth: {
      user: process.env.RECPASS_EMAIL,
      pass: process.env.RECPASS_EMAIL_PASS 
    }
});

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

exports.getUserPassword = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
    };
    // Validation Code here
    if(!validator.isEmail(data.email)) {
        validated = false;
    }

    if(validated) {
        loginsService.getUserPassword(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                      
                    var mailOptions = {
                        from: 'kftcollegiateschool@gmail.com',
                        to: results[0].email,
                        subject: 'Recover Password -- KFT',
                        html: '<h1>KFT Collegiate School</h1>'+
                              '<p>Email: <b>'+results[0].email+'</b></p>'+
                              '<p>Password: <b style="color:blue;">'+results[0].password+'</b></p>'+
                              '<p>Access: <b style="color:red;">'+results[0].access_name+'</b></p>'+
                              '<br><br>By-<br><i>Support, KFT</i>'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            return res.status(204).send({ success: false, data: "Something went wrong." });
                        } else {
                            return res.status(200).send({ success: true, data: "Password sent to email." });
                        }
                    });

                    // return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.updateUserPassword = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
        'password' : req.body.password,
    };
    // Validation Code here
    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        loginsService.updateUserPassword(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);

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
    return res.status(200).send({ success: true, data: "User Logged Out." });
};