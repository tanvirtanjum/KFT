const subjectsController = require("../controllers/subjects.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-subjects", subjectsController.getAllSubjects);
router.post("/post-designation", auth.authAdmin, subjectsController.postNotice);
router.delete("/delete-designation/:id", auth.authAdmin, subjectsController.deleteNotice);
router.put("/update-designation/:id", auth.authAdmin, subjectsController.updateNotice);

module.exports = router;