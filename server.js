const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const config = require(`${__dirname}/config.js`);
const {
  secret,
  dbUser,
  database,
  liveServerPostgres,
  domain,
  clientID,
  clientSecret,
  sendgridAPI
} = config;
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(sendgridAPI);

const port = 3000;

const connectionString = `postgres://${dbUser}@localhost/${database}`;

const app = express();

app.use("/", express.static(`${__dirname}/public`));

app.use(bodyParser());
app.use(cors());

massive(liveServerPostgres).then(db => app.set("db", db));

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
      const db = app.get("db");
      db.getUserByAuthId([profile._json.sub]).then((user, err) => {
        console.log(`INITIAL: ${user}`);
        if (!user[0]) {
          console.log(`CREATING USER`);
          db
            .createUserByAuth([profile.displayName, profile._json.sub])
            .then((user, err) => {
              console.log(`USER CREATED: ${JSON.stringify(user[0])}`);
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
  console.log("serializeUser: ", user);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log("deserializeUser: ", obj);
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
  if (!req.user) return res.status(401).json({ err: "User Not Authenticated" });
  res.status(200).json(req.user);
});

app.get("/auth/logout", (req, res) => {
  req.logout();
  req.redirect("/");
});

app.get("/writing-forum/writing", (req, res, next) => {
  const db = app.get("db");
  db
    .getForumPosts()
    .then(response => res.status(200).json(response))
    .catch(error => console.log("Error"));
});

app.post("/api/images", (req, res) => {
  console.log(req.body[0]);
  console.log(req.session.passport.user.authid);
  req.app
    .get("db")
    .upload_pic([req.body[0], req.session.passport.user.authid])
    .then(res.status(200).json(response => response));
});

app.post("/writing-forum/writing", (req, res, next) => {
  const { username, text } = req.body;
  const db = app.get("db");
  db
    .postForumPost([username, text])
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => console.log("Error: ", error));
});

app.post("/contact", (req, res, next) => {
  console.log(req.body);
  sendgrid.send(
    {
      to: "contact@ceruleanstorm.com",
      from: req.body.email,
      subject: req.body.subject,
      text: `From: ${req.body.name} Message: ${req.body.message}`,
      html: `<p>From: ${req.body.name} </br> Message: ${req.body.message}</p>`
    },
    function(err, json) {
      if (err) {
        return res.send("Error");
      }
      res.send("Email sent");
    }
  );
});

app.listen(port, () => {
  console.log(`It's Over ${port}!`);
});
