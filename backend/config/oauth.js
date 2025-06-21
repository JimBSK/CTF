const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/v1/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  // Логика поиска/создания пользователя
  const user = await User.findOrCreate({
    where: { googleId: profile.id },
    defaults: {
      email: profile.emails[0].value,
      name: profile.displayName
    }
  });
  done(null, user);
}));

// Аналогично для GitHub...