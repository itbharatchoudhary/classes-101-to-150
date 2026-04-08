
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const app = express();

// Initialize Passport - this is required to use Passport for authentication
app.use(passport.initialize());

/**
 * Configure the Google Strategy for Passport. This strategy will handle the authentication flow with Google. It requires the client ID and client secret from your Google Developer Console, as well as a callback URL where Google will redirect after authentication. The callback function receives the access token, refresh token, and user profile from Google, and it should return a user object that will be stored in the session (or in this case, used to generate a JWT).
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {

    // In a real application, you would typically find or create a user in your database here
  return done(null, profile);
}));

/**
 * Routes for authentication with Google. The first route initiates the authentication process, and the second route handles the callback from Google after authentication. If successful, it generates a JWT token and sends it back to the client.
 */


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  }
);



// The process of work Between user and server is as follows:
// 1. The user clicks on the "Login with Google" button on the client side, which sends a request to the server at the route /auth/google.
// 2. The server uses Passport to initiate the authentication process with Google. It redirects the user to Google's authentication page.
// 3. The user logs in to their Google account and grants permission to the application.
// 4. After successful authentication, Google redirects the user back to the server at the route /auth/google/callback, along with an authorization code.
// 5. The server uses Passport to handle the callback from Google. It exchanges the authorization code for an access token and retrieves the user's profile information.
// 6. The server generates a JWT token containing the user's information and sends it back to the client in the response.
// 7. The client can then use this JWT token for subsequent authenticated requests to the server.
