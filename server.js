const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const config = require("./config");

const port = 3000;

const app = express();

app.listen(port, () => {
  console.log(`It's Over ${port}!`);
});
