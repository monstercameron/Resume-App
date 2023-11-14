/**
 * Converts a row data from SQL query result into a job object.
 *
 * @param {Object} rowData - The row data from SQL query result for a job.
 * @returns {Object|null} A job object with structured job data. Returns null if rowData is not provided.
 */
const marshalJob = (rowData) => {
    if (!rowData) return null;
  
    return {
      jobId: rowData.job_id,
      userId: rowData.user_id,
      companyName: rowData.company_name,
      position: rowData.position,
      location: rowData.location,
      startDate: rowData.start_date,
      endDate: rowData.end_date,
      jobDescription: rowData.job_description,
    };
  };
  
  /**
   * Marshals an array of job row data into an array of job objects.
   *
   * @param {Array} rows - Array of row data from SQL query result for jobs.
   * @returns {Array} An array of marshaled job objects.
   */
  const marshalJobs = (rows) => {
    if (!Array.isArray(rows)) return [];
  
    return rows.map((row) => marshalJob(row));
  };
  
  module.exports = { marshalJobs };
  