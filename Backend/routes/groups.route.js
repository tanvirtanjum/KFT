const groupsController = require("../controllers/groups.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-groups", auth.authAdmin, groupsController.getAllGroups);

module.exports = router;