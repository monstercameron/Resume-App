const mysql = require("mysql2/promise");

/**
 * Creates and manages a MySQL connection pool.
 */
class DatabaseManager {
  /**
   * Initializes the connection pool.
   * @returns {Promise<mysql.Pool>} The MySQL connection pool.
   */
  static async initializePool() {
    if (!this.pool) {
      try {
        const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
        this.pool = mysql.createPool({
          host: DB_HOST,
          user: DB_USER,
          password: DB_PASS,
          database: DB_NAME,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
        console.log("Connection pool initialized.");
      } catch (error) {
        console.error("Failed to initialize connection pool:", error);
        throw error;
      }
    }
    return this.pool;
  }

  /**
   * Executes a stored procedure using the connection pool.
   * @param {string} procedureName - The name of the stored procedure.
   * @param {Array} params - The parameters for the stored procedure.
   * @returns {Promise<Array>} The results from the stored procedure execution.
   */
  static async executeProcedure(procedureName, params = []) {
    await this.initializePool();
    try {
      const query = `CALL ${procedureName}(?)`;
      const [results] = await this.pool.query(query, [params]);
      return results;
    } catch (error) {
      console.error(
        `Error executing stored procedure ${procedureName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Executes a raw SQL query using the connection pool.
   *
   * @param {string} sql - The SQL query string.
   * @param {Array} [params=[]] - Optional parameters for the query.
   * @returns {Promise<Array>} The results of the query.
   */
  static async executeQuery(sql, params = []) {
    await this.initializePool();
    try {
      const [results] = await this.pool.query(sql, params);
      return results;
    } catch (error) {
      console.error(`Error executing query: ${error}`);
      throw error;
    }
  }

  /**
   * Applies a marshaling function to each row of the provided query result.
   *
   * @param {Array} queryResult - The result array from a SQL query, as returned by mysql2/promise.
   * @param {Function} marshalFn - The function to apply to each row of data.
   * @returns {Array} An array of marshaled data objects.
   */
  static marshalData(queryResult, marshalFn) {
    // The actual data rows are in the first element of the queryResult array
    const dataRows = queryResult[0];

    // Check if the dataRows is an array and has elements
    if (Array.isArray(dataRows) && dataRows.length > 0) {
      return marshalFn(dataRows);
      // return dataRows.map((row) => marshalFn(row));
    }

    // Return an empty array if dataRows is not an array or is empty
    return [];
  }
}

module.exports = DatabaseManager;
