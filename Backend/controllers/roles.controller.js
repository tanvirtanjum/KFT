const rolesService = require("../services/roles.service");

exports.getAllRoles = (req, res, next) => {
    const data = {};
    // Validation Code here... (if required)
    rolesService.getAllRoles(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        }
        else {
            if (results.length > 0) {
                return res.status(200).send({ success: true, data: results });
            }

            else {
                return res.status(404).send({ success: false, data: "No Data Found." });
            }
        }
    });
};