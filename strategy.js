const Auth0Strategy = require("passport-auth0");
const config = require(`${__dirname}/config.js`);
const { domain, clientID, clientSecret } = config;

module.exports = new Auth0Strategy(
  {
    domain: domain,
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "/"
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    // console.log(profile.userid);
    // console.log('something');
    // const db = app.get("db");
    // db.getUserByAuthId([profile._json.sub]).then((user, err) => {
    //   console.log(`INITIAL: ${user}`);
    //   if (!user[0]) {
    //     console.log(`CREATING USER`);
    //     db
    //       .createUserByAuth([profile._json.sub])
    //       .then((user, err) => {
    //         console.log(`USER CREATED: ${user[0]}`);
    //         return done(err, user[0]);
    //       });
    //   } else {
    //     console.log(`FOUND USER: ${user[0]}`);
    //     return done(err, user[0]);
    //   }
    // });
    return done(null, profile);
  }
);
