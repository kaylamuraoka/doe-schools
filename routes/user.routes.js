// ROUTING
const database = require("./../models/db");

module.exports = (app) => {
  // API GET Requests
  // Creating a new user
  app.post("/api/user", async (req, res) => {
    const {
      username,
      password,
      email,
      first_name,
      last_name,
      user_type,
    } = req.body;

    try {
      await database.query(
        `INSERT INTO users (username, password, email, first_name, last_name, user_type, created_at) VALUES (
        @username, @password, @email, @first_name, @last_name, @user_type, NOW()
      )`,
        { username, password, email, first_name, last_name, user_type }
      );

      res.status(200);
      res.end("Added user");
    } catch (err) {
      console.error("Error adding user");
      res.status(500);
    }
  });

  // Logging in
  app.put("/api/user", async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await database.query(
        `SELECT * FROM users WHERE username = @username AND password = SHA2(@password, 256)
      `,
        { username, password }
      );

      res.status(200);
      res.end("User exists");
    } catch (err) {
      console.error("Error retrieving user");
      res.status(500);
      res.end("Error finding user. Does this user exist?");
    }
  });

  // Fetching existing users
  app.get("/api/user", async (req, res) => {
    try {
      const users = await database.query(
        `SELECT username, email, first_name, last_name, created_at, updated_at, FROM users
      `,
        { username, password }
      );

      res.status(200);
      res.json(users);
    } catch (err) {
      console.error("Error retrieving users");
      res.status(500);
      res.end("Error finding users");
    }
  });
};
