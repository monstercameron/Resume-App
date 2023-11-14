const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") }); // Adjusted path

// MySQL connection configuration using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: "utf8", // Set charset to UTF-8
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server.");

  readAndExecuteSQLFiles();
});

function readAndExecuteSQLFiles() {
  const directoryPath = path.join(__dirname, "../../sql/table");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log("Error reading directory:", err);
      return;
    }

    // Sort to ensure User.sql is executed first
    files.sort((a, b) => {
      if (a === "User.sql") return -1;
      if (b === "User.sql") return 1;
      return 0;
    });

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      let sql = fs.readFileSync(filePath, "utf8");

      // Replace \r\n with \n
      sql = sql.replace(/\r\n/g, "");

      connection.query(sql, (err, result) => {
        if (err) {
          console.log(`Error executing ${file}:`, err);
          return;
        }
        console.log(`${file} executed successfully.`);
      });
    });
  });
}
