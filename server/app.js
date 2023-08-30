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

// app.get("/test", async (req, res) => {
//   try {
//     const results = await queryDatabase("SELECT * FROM test where idtest = ?", [1]);
//     console.info("Query successful", results);
//     res.send(results);
//   } catch (error) {
//     console.error("Database query failed", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = app;
