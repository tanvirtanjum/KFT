const section_coursesController = require("../controllers/section_courses.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-courses/:id", auth.authAdmin, section_coursesController.getCourse);
router.get("/get-courses/section/:id", auth.authAdmin, section_coursesController.getCoursesBySection);
router.post("/insert-section", auth.authAdmin, section_coursesController.postSection);
router.put("/update-section/:id", auth.authAdmin, section_coursesController.updateSection);

module.exports = router;