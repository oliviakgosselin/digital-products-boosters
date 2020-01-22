require("dotenv").config();
const express = require("express");
const routes = require("./api/routes");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", routes.userRoutes);
app.use("/repos", routes.repoRoutes);

module.exports = app;
