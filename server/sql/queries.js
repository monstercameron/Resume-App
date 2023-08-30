const getResumes = (db) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM test", (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
    });
  });
};

module.exports = {
  getResumes,
};
