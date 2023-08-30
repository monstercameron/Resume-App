// Import the mysql2/promise library for making async calls to MySQL
const mysql = require('mysql2/promise');

// Declare a variable to hold the connection pool
let pool;

// Function to initialize the database connection pool
const initializeDatabase = async () => {
  // Check if a connection pool already exists
  if (pool) {
    console.log("Using existing connection pool.");
    return pool;
  }

  try {
    // Read environment variables for database connection
    const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

    // Create a new connection pool using the configuration details from environment variables
    pool = await mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      waitForConnections: true, // Whether to wait for a connection from the pool
      connectionLimit: 10,       // Maximum number of connections to create at once
      queueLimit: 0              // Maximum number of queries to queue (0 = unlimited)
    });

    console.log("Successfully created a new connection pool.");
    return pool;
  } catch (error) {
    // Log and throw any errors
    console.error("Could not connect to the database:", error);
    throw error;
  }
};

// Function to execute SQL queries using the connection pool
const queryDatabase = async (query, params = []) => {
  // If the connection pool is not initialized, initialize it
  if (!pool) {
    console.log("Initializing connection pool for the query.");
    await initializeDatabase();
  }

  try {
    // Execute the SQL query and store the results
    // The `pool.query()` method automatically acquires a connection from the pool, executes the query, and releases the connection
    const [results] = await pool.query(query, params);

    // Return the query results
    return results;
  } catch (error) {
    // Log and throw any errors during query execution
    console.error("Error executing query:", error);
    throw error;
  }
};

// Export the functions for external use
module.exports = {
  initializeDatabase,
  queryDatabase
};
