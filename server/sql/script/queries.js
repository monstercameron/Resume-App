const DatabaseManager = require("../../lib/database"); // Adjust the path as necessary
const { marshalUsers } = require("../../models/Users");
const { marshalProjects } = require("../../models/Projects");
const { marshalEducations } = require("../../models/Education");
const { marshalJobs } = require("../../models/Jobs");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

// Query testing palyground


// Function to call a stored procedure and process the results
async function callSP(userId) {
  try {
    const spResults = await DatabaseManager.executeProcedure(
      "sp_get_user_record",
      [userId]
    );
    const marshaledResults = DatabaseManager.marshalData(
      spResults,
      marshalUsers
    );
    // console.log("Marshaled Stored Procedure Result Raw: ");
    // console.log( spResults);
    console.log("Marshaled Stored Procedure Result: ", marshaledResults);
  } catch (err) {
    console.error("Error calling stored procedure: ", err);
  }
}

// Initialize the database and call the stored procedure
DatabaseManager.initializePool()
  .then(() => {
    callSP(1); // Replace 1 with the user ID you want to test
  })
  .catch((err) => {
    console.error("Error initializing database pool: ", err);
  });
