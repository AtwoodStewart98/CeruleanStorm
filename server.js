const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const strategy = require(`${__dirname}/strategy.js`);
const Auth0Strategy = require("passport-auth0");
const config = require(`${__dirname}/config.js`);
const nodemailer = require("nodemailer");
const { secret, dbUser, database } = config;

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
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// app.get("/auth", passport.authenticate("auth0"), (req, res, next) => {
//   res.json('ok')
// });

// app.get("/auth", passport.authenticate('auth0', { scope: 'openid profile' }));

app.get("/auth", passport.authenticate("auth0", {}), function(req, res, done) {
  console.log("req.user", req.user._json.sub);
  const db = req.app.get("db");

  db
    .getUserByAuthId([req.user._json.sub])
    .then((user, err) => {
      console.log("getting user", user);
      if (!user[0]) {
        db.createUserByAuth([req.user._json.sub]).then((user, err) => {
          console.log("creating user", user);
          return done(err, user[0]);
        });
      } else {
        return done(err, user[0]);
      }
    })
    .catch(err => console.log("Error here"));

  res.redirect("/");
});

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

// NODEMAILER FUNCTION
// nodemailer.createTestAccount((err, account) => {
//   let transporter = nodemailer.createTransport({
//     host: "contact@ceruleanstorm.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: account.user,
//       pass: account.pass
//     }
//   });
//   let mailOptions = {
//     from: "'home.name' <home.email>",
//     to: "contact@ceruleanstorm.com",
//     subject: "home.subject",
//     text: "home.message",
//     html: "<b>home.message</b>"
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   });
// });

app.listen(port, () => {
  console.log(`It's Over ${port}!`);
});
