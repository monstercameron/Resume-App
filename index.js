const App = require("./server/app");
const DatabaseManager = require("./server/lib/database");

const PORT = process.env.PORT || 3000;

const initServer = async () => {
  try {
    // Initialize the database pool using DatabaseManager
    await DatabaseManager.initializePool();

    // Start the Express server
    App.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error initializing server or database: ${error}`);
  }
};

initServer();
