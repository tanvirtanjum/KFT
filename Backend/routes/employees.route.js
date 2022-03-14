const employeesController = require("../controllers/employees.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-employees", employeesController.getAllEmployees);
router.get("/get-notice/:id", employeesController.getNotice);
router.post("/post-notice", auth.authAdmin, employeesController.postNotice);
router.delete("/delete-notice/:id", auth.authAdmin, employeesController.deleteNotice);
router.put("/update-notice/:id", auth.authAdmin, employeesController.updateNotice);

module.exports = router;