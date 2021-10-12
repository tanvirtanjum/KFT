// Importing System Library Modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

// Importing Created Modules
const rolesRoutes = require("./routes/roles.route");
const loginsRoutes = require("./routes/logins.route");

// <---> 
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(cors());

app.use("/api/roles", rolesRoutes);
app.use("/api/logins", loginsRoutes);

app.listen(process.env.SERVER_PORT_NO, () => {
  console.log("Server Started at Port: 3000.");
});