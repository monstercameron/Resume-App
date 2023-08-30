const express = require('express')
const router = express.Router()
const { home } = require("./home")

router.get("/", home)

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

module.exports = router