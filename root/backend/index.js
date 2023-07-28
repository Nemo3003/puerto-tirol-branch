// basic express server
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongodb = require('./src/db/connect');



app
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./src/router"));

// Start the server on port 3000

// Main
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to port => ${port}`);
  }
});