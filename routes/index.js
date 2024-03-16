var express = require('express');
var router = express.Router();
const localStrategy = require(`passport-local`)
const passport = require(`passport`)
const userModel = require(`./users.js`);




passport.use(new localStrategy(userModel.authenticate()));






router.post(`/register`, function(req, res, next) {
  var newUser = new userModel({
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
  })

  userModel.register(newUser, req.body.password)
      .then(function(e) {
          passport.authenticate(`local`)(req, res, function() {
              res.redirect(`/profile`);
          })
      })

  .catch(function(err) {
      res.send(err);
  })

})


router.post(`/login`, passport.authenticate(`local`, {
    successRedirect: `/profile`,
    failureRedirect: `/login`,
    failureFlash: true,
}))


router.get('/logout', IsLoggedIn, function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


function IsLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(`/login`);
}


router.get('/', function(req, res) {
    res.render('index', {footer: false});
  });
  
  router.get('/login', function(req, res) {
    res.render('login', {footer: false});
  });
  
  router.get('/feed', function(req, res) {
    res.render('feed', {footer: true});
  });
  
  router.get('/profile', function(req, res) {
    res.render('profile', {footer: true});
  });
  
  router.get('/search', function(req, res) {
    res.render('search', {footer: true});
  });
  
  router.get('/edit', function(req, res) {
    res.render('edit', {footer: true});
  });
  
  router.get('/upload', function(req, res) {
    res.render('upload', {footer: true});
  });
  


module.exports = router;