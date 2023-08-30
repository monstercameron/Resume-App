require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./lib/logger");
const router = require('./routes/routes')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.get("/", router);

module.exports = app;
