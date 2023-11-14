const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const { marshalUser } = require("../../models/Users");
const { marshalProjects } = require("../../models/Projects");
const { marshalEducations } = require("../../models/Education");
const { marshalJobs } = require("../../models/Jobs");

// MySQL connection configuration using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: "utf8",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server.");

  callSP(1); // Replace 1 with the user ID you want to test
});

function callSP(userId) {
  connection.query(
    "CALL sp_get_all_jobs_for_user(?)",
    [userId],
    (err, results) => {
      if (err) {
        console.log("Error calling stored procedure: ", err);
        return;
      }

      console.log("Stored Procedure Result: ", marshalJobs(results[0]));
    }
  );
}
