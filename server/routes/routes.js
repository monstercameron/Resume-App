const express = require("express");
const router = express.Router();
const { home } = require("./home");
const { login } = require("./login");
const { app } = require("./app");

router.get("/", home);
router.get("/login", login);
router.get("/app", app);

module.exports = router;
