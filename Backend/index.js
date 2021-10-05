// Importing System Library Modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

// Importing Created Modules
const rolesRoutes = require("./routes/roles.route");

// <---> 
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/roles", rolesRoutes);

app.listen(process.env.SERVER_PORT_NO, () => {
  console.log("Server Started at Port: 3000.");
});