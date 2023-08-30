// Import required modules
// 'App' is our configured Express application from './server/app'
const App = require("./server/app");

// 'connect' is a function to connect to our database, located in './server/lib/database'
const { initializeDatabase } = require("./server/lib/database");

// Read the PORT environment variable or use 3000 as the default port.
// This allows for configuration at runtime through the environment variable,
// which can be important when deploying to different environments.
const PORT = process.env.PORT || 3000;

// Async function to handle server setup and database connection
const initServer = async () => {
  try {
    // Try connecting to the database
    // This is asynchronous, so we wait for it to finish
    await initializeDatabase();
  
    // If successful, continue to launch the server
    // 'App.listen' is non-blocking so we can continue to execute other code after this
    App.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    // Log any errors that occur during the database connection or server launch
    console.error(`Error: ${error}`);
  }
};

// Call our async function to initiate the server and database connection
initServer();
