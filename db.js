const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "StrongPass123!",
  database: "chat_app"
});

module.exports = connection.promise();