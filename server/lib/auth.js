const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "your_secret_key"; // Replace with your secret key
const REFRESH_SECRET_KEY = "your_refresh_secret_key"; // Replace with your refresh token secret key

/**
 * Generate a JWT for a given user.
 *
 * @param {Object} user - The user object to encode in the JWT.
 * @returns {string} The generated JWT.
 */
const generateJWT = (user) => {
  return jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
};

/**
 * Authenticate a JWT and return the decoded token if valid.
 *
 * @param {string} token - The JWT to authenticate.
 * @returns {Object|null} The decoded token if valid, null otherwise.
 */
const authenticateJWT = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};

/**
 * Refresh a JWT using a refresh token.
 *
 * @param {string} refreshToken - The refresh token to generate a new JWT.
 * @returns {string|null} The new JWT if the refresh token is valid, null otherwise.
 */
const refreshJWT = (refreshToken) => {
  try {
    const user = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    return generateJWT(user);
  } catch (err) {
    return null;
  }
};

/**
 * Hash a password.
 *
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compare a plain text password against a hashed password.
 *
 * @param {string} password - The plain text password to compare.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} True if the password matches the hash, false otherwise.
 */
const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// test jwt creation
// const test = () => {
//   const user = {
//     id: 1,
//     username: "test",
//   };
//   const token = generateJWT(user);
//   console.log(token);
//   const decoded = authenticateJWT(token);
//   console.log(decoded);
// };
// test();

// Export functions
module.exports = {
  generateJWT,
  authenticateJWT,
  refreshJWT,
  hashPassword,
  comparePassword,
};
