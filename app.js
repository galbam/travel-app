require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

// WHEN INTRODUCING USERS DO THIS:
// INSTALL THESE DEPENDENCIES: passport-local, passport, bcryptjs, express-session
// AND UN-COMMENT OUT FOLLOWING LINES:

const session       = require('express-session');
const passport      = require('passport');

require('./configs/passport');

// IF YOU STILL DIDN'T, GO TO 'configs/passport.js' AND UN-COMMENT OUT THE WHOLE FILE

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/travel-board", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

// /!\

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/client/build")));

// /!\

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// ADD SESSION SETTINGS HERE:

const MongoStore = require("connect-mongo")(session);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

// USE passport.initialize() and passport.session() HERE:

app.use(passport.initialize());
app.use(passport.session());


// default value for title local
app.locals.title = "Travel Board Server";

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:

// ROUTES MIDDLEWARE STARTS HERE:

const index = require("./routes/index");
app.use("/", index);


const auth = require("./routes/auth");
app.use("/api/auth", auth);


const trip = require("./routes/trips");
app.use("/api/trips", trip);


const packingList = require("./routes/packingList");
app.use("/api/packingList", packingList);


// Draft Activity
const draftActivity = require("./routes/draftActivity");
app.use("/api/draftActivities", draftActivity);


//DOCUMENTATION
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});


module.exports = app;
