const passport = require("passport");

exports.sessionCreate = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json({ message: "Authentification réussie" });
    });
  })(req, res, next);
};

exports.sessionDelete = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({ message: "Déconnexion réussie" });
  });
};

exports.googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  })(req, res, next);
};

exports.googleAuthCb = (req, res, next) => {
  passport.authenticate("google")(req, res, next);
};
