const auth = require("../lib/auth");

const protected = (req, res, next) => {
  // Log the protected route access attempt
  console.log(`Protected route access attempt at ${req.url}`);

  // Retrieve the token from cookies
  const { token } = req.cookies;

  // Check for the presence of a token
  if (!token) {
    return res.render("pages/base", {
      page: "./didNotLogin",
      message: "You must be logged in to view this page",
    });
  }

  try {
    // Attempt to authenticate the token
    const payload = auth.authenticateJWT(token);
    console.log("payload", payload);
    req.user = payload;
    next();
  } catch (error) {
    // Handle authentication errors
    console.error(`Protected route error: ${error.message}`);
    return res.render("pages/base", {
      page: "./didNotLogin",
      message: "Invalid or expired session. Please log in again.",
    });
  }
};

module.exports = { protected };
