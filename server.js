// Requiring necessary npm packages
// npm i or npm init -y
// npm i express && express-session? === for line 4
// npm i mysql2 && sequelize"
var express = require("express");
var session = require("express-session");

// Requiring passport as we've configured it
// we create this var that we use in the config folder with will extend to passport.js
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
// This lets us a certain env PORT or able to render on localhost:8080
var PORT = process.env.PORT || 8080;
// this var db will be rendered in models folder in index.js. storing information in a an empty obj array.
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
// this lets us be able to connect to our routes in our routes folder
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
// this will let us know that we have a connection.
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
