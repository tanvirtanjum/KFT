// <-- Importing System Library Modules -->
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

// <-- IMPORTING ROUTES -->
const downloadRoutes = require("./routes/download.route");
const rolesRoutes = require("./routes/roles.route");
const loginsRoutes = require("./routes/logins.route");
const noticesRoutes = require("./routes/notices.route");
const notice_filesRoutes = require("./routes/notice_files.route");
const admission_noticesRoutes = require("./routes/admission_notices.route");
const admission_notice_filesRoutes = require("./routes/admission_notice_files.route");
const employeesRoutes = require("./routes/employees.route");
const designationsRoutes = require("./routes/designations.route");
const employment_statusRoutes = require("./routes/employment_status.route");

// <---> 
dotenv.config();

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(cors());

// <-- ROUTES -->
app.use('/api/download', downloadRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/logins", loginsRoutes);
app.use("/api/notices", noticesRoutes);
app.use("/api/notice_files", notice_filesRoutes);
app.use("/api/admission_notices", admission_noticesRoutes);
app.use("/api/admission_notice_files", admission_notice_filesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/designations", designationsRoutes);
app.use("/api/employment_status", employment_statusRoutes);

// <-- -->
app.listen(process.env.SERVER_PORT_NO, () => {
  console.log("Server Started at Port: 3000.");
});