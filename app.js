require("dotenv").config();
require("./src/server/config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./src/server/model/user");
const auth = require("./src/server/middleware/auth");

const app = express();

app.use(express.json({ limit: "50mb" }));

// routing files
app.use(require ("./src/server/routes/route"));

const port = process.env.API_PORT;

app.listen(port, function(){
  console.log(`Server running on port ${port}`);
});