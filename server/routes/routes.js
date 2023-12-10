const express = require("express");
const router = express.Router();

const { home } = require("./home");
router.get("/", home);

const { loginPage, login, registerPage, register } = require("./login");
router.get("/login", loginPage);
router.post("/login", login);
router.get("/register", registerPage);
router.post("/register", register);

const { app } = require("./app");
router.get("/app", app);

module.exports = router;
