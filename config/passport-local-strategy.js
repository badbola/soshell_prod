const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", "err");
          return done(err);
        }
        if (!user || user.password != password) {
          req.flash("error", "Invalid User Name or Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serialization

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// desirialization

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user===> Passport");
      return done(err);
    }
    return done(null, user);
  });
});

//check authentication
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/signin");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the cureent signed in user from the session cookies and we are just sending this locals for the views
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
