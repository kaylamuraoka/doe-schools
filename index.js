// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const express = require("express");
const mysql = require("mysql");
const config = require("./config/db.config");

// EXPRESS CONFIGURATION
// Create express app instance.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// MySQL DB CONNECTION INFORMATION
const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
});

// Initiate MySQL Connection
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

app.get("/users", (req, res) => {
  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query(
    "SELECT user_id, username, email, first_name, last_name FROM users ORDER BY user_id",
    (err, result) => {
      if (err) throw err;
      // We then begin building out HTML elements for the page.
      let html = "<h1> List of users </h1>";

      // Here we begin an unordered list.
      html += "<ul>";

      // We then map over the retrieved records from the database to populate our HTML file.
      result.map(({ user_id, username, email }) => {
        html += `<li><p> ID: ${user_id}</p>`;
        html += `<p>Username: ${username} </p>`;
        html += `<p>Email: ${email}</p>`;
        html += `<p>First Name: ${first_name}</p>`;
        html += `<p>Last Name: ${last_name}</p></li>`;
        return html;
      });

      // We close our unordered list.
      html += "</ul>";
      console.log(html);

      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    }
  );
});

// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
