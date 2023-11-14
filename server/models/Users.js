/**
 * Converts a row data from SQL query result into a user object.
 *
 * @param {Object} rowData - The row data from SQL query result.
 * @returns {Object|null} A user object with structured user data. Returns null if rowData is not provided.
 */
const marshalUser = (rowData) => {
  if (!rowData) return null;

  return {
    userId: rowData.user_id,
    username: rowData.username,
    email: rowData.email,
    hash: rowData.hash,
    recoveryHash: rowData.recovery_hash,
    phoneNumber: rowData.phone_number,
    objectives: rowData.objectives,
    createdAt: rowData.created_at,
    updatedAt: rowData.updated_at,
  };
};

module.exports = { marshalUser };
