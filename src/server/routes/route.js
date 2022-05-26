const express = require('express');
const router = express.Router();
const authorization = require("../middleware/auth");
const controller = require('../controller/auth.controller');

router.get('/', authorization, (req, res) => {
  res.send("Welcome to Forage!!");
});
router.get('/dashboard', authorization, (req, res) => {
  res.send("Welcome to Dashboard!!");
});

// signUp route
router.post('/registerUser', controller.userSignup);
router.post('/registerNgo', controller.ngoSignup);

// login route
router.post('/login',  controller.signin);

// LogOut route
router.get('/logout', controller.logout);

// This should be the last route else any after it won't work
router.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    }
  });
});

module.exports = router;