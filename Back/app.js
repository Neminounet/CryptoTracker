require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const session = require("./config/session.config");
const passport = require("./config/passport.config");

const db = require("./database/db");
const routes = require("./routes/index");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

db.authDb();
db.initDb();

app.listen(port, () => {
  console.log(`Application démarrée sur : http://localhost:${port}`);
});
