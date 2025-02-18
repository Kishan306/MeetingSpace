const mysql = require('mysql2');
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = connection.promise();