/**
 * Converts a row data from SQL query result into an education object.
 *
 * @param {Object} rowData - The row data from SQL query result for an education record.
 * @returns {Object|null} An education object with structured education data. Returns null if rowData is not provided.
 */
const marshalEducation = (rowData) => {
    if (!rowData) return null;
  
    return {
      educationId: rowData.education_id,
      userId: rowData.user_id,
      institutionName: rowData.institution_name,
      degree: rowData.degree,
      fieldOfStudy: rowData.field_of_study,
      startDate: rowData.start_date,
      endDate: rowData.end_date,
      grade: rowData.grade,
      activities: rowData.activities,
      description: rowData.description
    };
  };
  
  /**
   * Marshals an array of education row data into an array of education objects.
   *
   * @param {Array} rows - Array of row data from SQL query result for education records.
   * @returns {Array} An array of marshaled education objects.
   */
  const marshalEducations = (rows) => {
    if (!Array.isArray(rows)) return [];
  
    return rows.map((row) => marshalEducation(row));
  };
  
  module.exports = { marshalEducations };
  