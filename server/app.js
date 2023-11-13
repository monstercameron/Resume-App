require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const logger = require("./lib/logger");
const router = require("./routes/routes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.set("view engine", "ejs");

// Assuming your views are in a folder named 'view' located at the same level as your entry script
app.set("views", path.join(__dirname, "view"));

// Assuming your static files are in a folder named 'public' inside the 'view' folder
app.use(express.static(path.join(__dirname, "view", "public")));

// Routes
app.use(router);

router.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
