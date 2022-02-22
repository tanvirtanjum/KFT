const notice_filesController = require("../controllers/notice_files.controller");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

var express = require("express");

var router = express.Router();

router.get("/get-all-files/notice/:id", notice_filesController.getAllFilesByNotice);
router.post("/post-files/notice/:id", upload.single('attachment'), notice_filesController.getAllRoles);

module.exports = router;