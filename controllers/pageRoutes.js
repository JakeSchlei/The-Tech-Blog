const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get('/dashboard',  (req, res) => {
  
  res.render('dashboard', {
    loggedIn: req.session.userID
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/home', (req, res) => {
  res.render('homepage');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});




module.exports = router;