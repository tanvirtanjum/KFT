const notice_filesController = require("../controllers/notice_files.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-files/notice/:id", notice_filesController.getAllRoles);

module.exports = router;