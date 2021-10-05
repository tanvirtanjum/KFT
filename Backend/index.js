const express = require("express");
const bodyParser = require("body-parser");

const rolesRoutes = require("./routes/roles.route");

const app = express();

app.use(bodyParser.json());

app.use("/api/roles", rolesRoutes);

app.listen(3000, () => {
  console.log("Server Started at Port: 3000.");
});