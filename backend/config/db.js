const mysql = require('mysql2');
require("dotenv").config();

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

module.exports = connection.promise();