const app = async (req, res) => {
  res.render("pages/base", { page: "./edit" });
};

module.exports = { app };
