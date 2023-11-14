const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const { marshalUser } = require("../../models/Users");

// MySQL connection configuration using environment variables
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: "utf8"
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL server.");

    callSP(1); // Replace 1 with the user ID you want to test
});

function callSP(userId) {
    connection.query('CALL sp_get_user_record(?)', [userId], (err, results) => {
        if (err) {
            console.log("Error calling stored procedure: ", err);
            return;
        }

        console.log("Stored Procedure Result: ", marshalUser(results[0][0]));
    });
}
