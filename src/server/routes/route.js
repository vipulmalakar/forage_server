const express = require('express');
const router = express.Router();
const authorization = require("../middleware/auth");
const controller = require('../controller/auth.controller');
const newPost = require ('../controller/user/createpost');
const userHome = require ('../controller/user/profile');
const getPosts = require("../controller/ngo/getpost");
const deletePost = require("../controller/user/deletePost")

router.get('/', (req, res) => {
  res.send("Welcome to Forage!!");
});
router.get('/dashboard', authorization, (req, res) => {
  res.send("Welcome to Dashboard!!");
});
router.get('/ngoHome', authorization, getPosts.posts);

router.get('/userHome', authorization, userHome.profile);

// signUp route
router.post('/registerUser', controller.userSignup);
router.post('/registerNgo', controller.ngoSignup);

//update route
router.patch('/updateUser', authorization, controller.updateUser);

// login route
router.post('/login',  controller.signin);

// Create Post
router.post('/createPost', authorization, newPost.createPost);

// Delete Post
router.delete("/deletePost/:id", authorization, deletePost.delete);

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