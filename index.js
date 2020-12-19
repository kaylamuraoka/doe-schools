// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(morgan("dev"));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse requests of content-type: application/json
app.use(bodyParser.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to this application." });
});

require("./routes/user.routes")(app);
// require("./routes/htmlRoutes")(app);

// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, () => {
  console.log(`Server is currently running on port ${PORT}.`);
});
