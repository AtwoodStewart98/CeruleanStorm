const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const strategy = require(`${__dirname}/strategy.js`);
const Auth0Strategy = require("passport-auth0");
const config = require(`${__dirname}/config.js`);
const { secret, dbUser, database, domain, clientID, clientSecret } = config;

const port = 3000;

const connectionString = `postgres://${dbUser}@localhost/${database}`;

const app = express();

app.use("/", express.static(`${__dirname}/public`));

app.use(bodyParser());
app.use(cors());

massive(connectionString).then(db => app.set("db", db));

app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/auth/callback"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      console.log(profile.authid);
      const db = app.get("db");
      db.getUserByAuthId([profile.authid]).then((user, err) => {
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
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/auth", passport.authenticate("auth0"));

app.get(
  "/auth/callback",
  passport.authenticate("auth0", { successRedirect: "/" }),
  (req, res) => {
    res.status(200).json(req.user);
  }
);

app.get("/auth/me", (req, res) => {
  console.log("Hit");
  if (!req.user) return res.status(401).json({ err: "User Not Authenticated" });
  res.status(200).json(req.user);
});

app.listen(port, () => {
  console.log(`It's Over ${port}!`);
});
