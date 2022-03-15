const employeesController = require("../controllers/employees.controller");
const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/employee images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

var express = require("express");

var router = express.Router();

router.get("/get-all-employees", employeesController.getAllEmployees);
router.get("/get-employee/:id", employeesController.getEmployee);
router.get("/name/:name", employeesController.getEmployeeByName);
router.post("/post-notice", auth.authAdmin, employeesController.postNotice);
router.delete("/delete-notice/:id", auth.authAdmin, employeesController.deleteNotice);
router.put("/update-employee/:id", auth.authAdmin, employeesController.updateEmployee);
router.put("/update-employee-image/:id", auth.authAdmin, upload.single('uploaded_update_file'), employeesController.updateEmployeeImage);

module.exports = router;