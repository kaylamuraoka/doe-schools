const database = require("./db");

// Constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.user_type = user.user_type;
  this.active = user.active;
  this.created_at = user.created_at;
  this.updated_at = user.updated_at;
};

User.create = (newUser, result) => {
  database.query("INSERT INTO customers SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created user: ", { id: res.insertId, ...newUser });
    result(null, { if: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  database.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (result) => {
  database.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  database.query(
    "UPDATE users SET username = ?, password = ?, email = ?, first_name = ?, last_name = ?, user_type = ?, active = ? WHERE id = ?",
    [
      user.username,
      user.password,
      user.email,
      user.first_name,
      user.last_name,
      user.user_type,
      user.active,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};
