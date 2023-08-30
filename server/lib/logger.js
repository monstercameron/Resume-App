// Import required modules
const fs = require("fs");
const path = require("path");

// Check if the 'logs' directory exists, if not create it
// This directory will hold the log files
const logsDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Redirect console.log and console.error output to files
// Create writable streams for each log file (api.log and error.log)

// For general logs (corresponds to console.log)
const logStream = fs.createWriteStream(path.join(logsDir, "console.log"), {
  flags: "a", // 'a' means appending (i.e., write data at the end of the file)
});

// For error logs (corresponds to console.error)
const errorStream = fs.createWriteStream(path.join(logsDir, "error.log"), {
  flags: "a",
});

// Override the default console.log function
// This will write to api.log and also to the standard output
// console.log = function (message) {
//   logStream.write(new Date().toISOString() + " " + message + "\n");
//   process.stdout.write(message + "\n");
// };

// Override the default console.error function
// This will write to error.log and also to the standard error output
// console.error = function (message) {
//   errorStream.write(new Date().toISOString() + " " + message + "\n");
//   process.stderr.write(message + "\n");
// };

// Middleware to log HTTP request and response details
const logger = (req, res, next) => {
  // Record the start time of the request
  const startTime = Date.now();
  
  // Destructure relevant information from the request object
  const { method, url, headers, body, ip } = req;

  // Attach a listener to the 'finish' event of the response object
  // This will execute when the response is sent
  res.on("finish", () => {
    // Calculate the elapsed time for the request/response cycle
    const elapsedTime = Date.now() - startTime;

    // Get the status code from the response
    const statusCode = res.statusCode;

    // Create a log object containing all the details we want to log
    const logDetails = {
      timestamp: new Date().toISOString(),
      method,
      url,
      statusCode,
      clientIp: ip,
      userAgent: headers["user-agent"],
      headers,
      body,
      elapsedTime: `${elapsedTime}ms`,
    };

    // Create a shortened log message for console output
    // const logMessageShort = `${new Date().toISOString()} ${req.method} ${req.url}`;

    // Log the short message to console (this will also go into api.log due to our override)
    // console.log(logMessageShort.trim());

    // Convert the logDetails object to a JSON string
    const logMessage = JSON.stringify(logDetails);

    // Append this detailed log message to api.log
    fs.appendFile(path.join(logsDir, "api.log"), logMessage + "\n", (err) => {
      if (err) {
        // Log any errors related to file write operation
        console.error("Failed to write to log file:", err);
      }
    });
  });

  // Call the next middleware in the stack
  next();
};

// Export the logger middleware
module.exports = logger;
