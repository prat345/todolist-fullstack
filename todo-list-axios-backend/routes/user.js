const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

// API > localhost:8000/users/register, POST > body:{username, password, name}
router.post("/register", userControllers.registerUser);
// API > localhost:8000/users/login, POST > body:{username, password}
router.post("/login", userControllers.loginUser);

module.exports = router;
