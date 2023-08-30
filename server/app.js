require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./lib/logger");
const { initializeDatabase, queryDatabase } = require("./lib/database");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", async (req, res) => {
  try {
    const results = await queryDatabase("SELECT * FROM test where idtest = ?", [1]);
    console.info("Query successful", results);
    res.send(results);
  } catch (error) {
    console.error("Database query failed", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
