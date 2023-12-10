const db = require("../lib/database");
const auth = require("../lib/auth");
const validator = require("validator");

const loginPage = async (req, res) => {
  console.log("loginPage");
  res.render("pages/base", { page: "./login" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("pages/base", {
      page: "./didNotLogin",
      message: "Email and password are required",
    });
  }

  try {
    const [users] = await db.executeProcedure("sp_get_user_record", [email]);

    if (users.length === 0) {
      return res.render("pages/base", {
        page: "./didNotLogin",
        message: "User not found",
      });
    }

    const [user] = users;

    if (await auth.comparePassword(email + password, user.hash)) {
      const token = auth.generateJWT({ email, isAdmin: false });
      res.cookie("token", token, { httpOnly: true });
      res.render("pages/base", {
        page: "./didLogin",
        message: "Login successful",
      });
    } else {
      res.render("pages/base", {
        page: "./didNotLogin",
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.render("pages/base", {
      page: "./didNotLogin",
      message: "An error occurred during login",
    });
  }
};

const registerPage = async (req, res) => {
  console.log("registerPage");
  res.render("pages/base", { page: "./register" });
};

const register = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  // Input validation
  if (!validator.isEmail(email)) {
    return res.render("pages/didNotRegister", { message: "Invalid email" });
  }
  if (password !== confirmPassword) {
    return res.render("pages/didNotRegister", {
      message: "Passwords do not match",
    });
  }
  if (password.length < 8) {
    return res.render("pages/didNotRegister", {
      message: "Password must be at least 8 characters",
    });
  }
  if (!validator.isAlpha(userName)) {
    return res.render("pages/didNotRegister", {
      message: "Username must be alphabetical",
    });
  }
  if (userName.length > 20) {
    return res.render("pages/didNotRegister", {
      message: "Username must be less than 20 characters",
    });
  }

  try {
    const [users] = await db.executeProcedure("sp_get_user_record", [email]);
    if (users.length > 0) {
      return res.render("pages/base", {
        page: "./didNotRegister",
        message: "User Email Already Exists",
      });
    }

    const hashedPassword = await auth.hashPassword(email + password);
    await db.executeProcedure("sp_insert_user_record", [
      userName,
      email,
      hashedPassword,
      hashedPassword, //placeholder, update with actual value if needed
      "phone number", // Placeholder, update with actual value if needed
      "objectives", // Placeholder, update with actual value if needed
    ]);

    res.render("pages/base", {
      page: "./didRegister",
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:");
    console.error(error);
    res.render("pages/base", {
      page: "./didNotRegister",
      message: "An error occurred during registration",
    });
  }
};

module.exports = { loginPage, login, registerPage, register };
