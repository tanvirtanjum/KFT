const designationsController = require("../controllers/designations.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-designations", designationsController.getAllDesignation);
router.post("/post-designation", auth.authAdmin, designationsController.postNotice);
router.delete("/delete-designation/:id", auth.authAdmin, designationsController.deleteNotice);
router.put("/update-designation/:id", auth.authAdmin, designationsController.updateNotice);

module.exports = router;