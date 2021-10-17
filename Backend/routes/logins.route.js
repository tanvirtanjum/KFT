const loginsController = require("../controllers/logins.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.post("/get-user-authentication", loginsController.getUser);
router.post("/get-user-authentication-password", loginsController.getUserPassword);
router.get('/authenticated-user/logout', auth.authLogin, loginsController.getUserLogout);

module.exports = router;