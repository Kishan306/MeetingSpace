const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const routes = require('./routes/routes')

require("dotenv").config();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

const app = express();
const port = 4000;

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
