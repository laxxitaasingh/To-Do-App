const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "laxitasingh",
  password: "12345",
  database: "todo",
});

db.connect((err) => {
  if (err) {
    console.log("err");
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = db;