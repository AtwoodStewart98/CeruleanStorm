const express = require("express");
const Auth0Strategy = require("passport-auth0");
const config = require(`${__dirname}/config.js`);
const { domain, clientID, clientSecret } = config;

const app = express();

module.exports = new Auth0Strategy(
  {
    domain,
    clientID,
    clientSecret,
    callbackURL: "/auth/callback"
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    console.log(profile.id);
    const db = app.get("db");
    db.getUserByAuthId([profile.id]).then((user, err) => {
      console.log(`INITIAL: ${user}`);
      if (!user[0]) {
        console.log(`CREATING USER`);
        db
          .createUserByAuth([profile.displayName, profile.id])
          .then((user, err) => {
            console.log(`USER CREATED: ${user[0]}`);
            return done(err, user[0]);
          });
      } else {
        console.log(`FOUND USER: ${user[0]}`);
        return done(err, user[0]);
      }
    });
  }
);
