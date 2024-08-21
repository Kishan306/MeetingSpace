const mysql = require('mysql2');
require("dotenv").config();

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

module.exports = connection.promise();