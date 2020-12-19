// Import the database library
const { Prohairesis } = require("prohairesis");
const env = require("./../env");

// Create the database instance
const database = new Prohairesis(env.CLEARDB_DATABASE_URL);
module.exports = database;
