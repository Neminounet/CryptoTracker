const passport = require("passport");
const crypto = require("crypto");
const {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByGoogleId,
} = require("../queries/user.queries");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Stratégie locale :
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "Utilisateur non trouvé." });
        }
        const match = await user.comparePassword(password);
        if (!match) {
          return done(null, false, { message: "Mot de passe incorrect." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const user = await getUserByGoogleId(profile.id);
        if (user) {
          done(null, user);
        } else {
          const randomPassword = crypto.randomBytes(16).toString("hex");
          const newUser = await createUser({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            password: randomPassword,
            isOAuthUser: true,
          });
          const userJson = newUser.toJSON();
          done(null, userJson);
        }
      } catch (err) {
        done(err, false, { message: "test" });
      }
    }
  )
);

module.exports = passport;
