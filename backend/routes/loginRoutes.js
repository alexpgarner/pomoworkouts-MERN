const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const pomoController = require("../controllers/pomoController")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/login", authController.postLogin);
router.post("/register", authController.postSignup);
router.get("/profile", ensureAuth, pomoController.getProfile);
router.get("/logout", authController.logout);

module.exports = router