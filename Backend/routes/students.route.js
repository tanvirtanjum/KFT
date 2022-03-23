const studentsController = require("../controllers/students.controller");
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

router.get("/get-all-students", studentsController.getAllEmployees);
router.get("/get-employee/:id", studentsController.getEmployee);
router.get("/name/:name", studentsController.getEmployeeByName);
router.post("/insert-employee", auth.authAdmin, studentsController.postEmployee);
router.put("/update-employee/:id", auth.authAdmin, studentsController.updateEmployee);
router.put("/update-employee-image/:id", auth.authAdmin, upload.single('uploaded_update_file'), studentsController.updateEmployeeImage);
router.put("/insert-employee-image/:id", auth.authAdmin, upload.single('uploaded_file'), studentsController.insertEmployeeImage);
router.get("/checkcontact/:contact", auth.authAdmin, studentsController.getContact);
router.get("/checkfileno/:fileno", auth.authAdmin, studentsController.getFileNo);

module.exports = router;