require("dotenv").config();
const path = require("path"); 
const express = require("express");
const app = express();
const logger = require("./lib/logger");
const router = require('./routes/routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'view'));

// Routes
app.get("/", router);

module.exports = app;
