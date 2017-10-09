const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const strategy = require(`${__dirname}/strategy.js`);
const config = require(`${__dirname}/config.js`);
const { secret, dbUser, database } = config;

const port = 3000;

const connectionString = `postgres://${dbUser}@localhost/${database}`;

const app = express();

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
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.listen(port, () => {
  console.log(`It's Over ${port}!`);
});
