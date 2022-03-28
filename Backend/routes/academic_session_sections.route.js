const academic_sessions_sectionsController = require("../controllers/academic_session_sections.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-sections/session/:session_id", auth.authAdmin, academic_sessions_sectionsController.getSectionsBySession);
router.post("/insert-session", auth.authAdmin, academic_sessions_sectionsController.postSession);
router.put("/update-session/:id", auth.authAdmin, academic_sessions_sectionsController.updateSession);

module.exports = router;