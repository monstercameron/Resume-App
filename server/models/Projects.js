/**
 * Converts a row data from SQL query result into a project object.
 *
 * @param {Object} rowData - The row data from SQL query result for a project.
 * @returns {Object|null} A project object with structured project data. Returns null if rowData is not provided.
 */
const marshalProject = (rowData) => {
  if (!rowData) return null;

  return {
    projectId: rowData.project_id,
    userId: rowData.user_id,
    projectName: rowData.project_name,
    startDate: rowData.start_date,
    endDate: rowData.end_date,
    role: rowData.role,
    description: rowData.description,
    url: rowData.url,
  };
};

/**
 * Marshals an array of project row data into an array of project objects.
 *
 * @param {Array} rows - Array of row data from SQL query result for projects.
 * @returns {Array} An array of marshaled project objects.
 */
const marshalProjects = (rows) => {
  if (!Array.isArray(rows)) return [];

  return rows.map((row) => marshalProject(row));
};

module.exports = { marshalProjects };
