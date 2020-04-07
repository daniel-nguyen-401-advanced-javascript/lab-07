'use strict';

const express = require('express');

// verify path on data
let data = require('../db.json');
//
const notFound = require('./middleware/404.js');
const logger = require('./middleware/logger');

const app = express();

//middleware
app.use(express.json());
app.use(logger);

const startServer = (port) => {
  //check if server is up and port is valid

  //call callback anon fn when server is up
  app.listen(port, () => {
    console.log('server up on port', port);
  });
};

//routes
app.get('/', (req, res, next) => {

  let homeHTML = '<div><h1>This is the homepage</h1>';

  if (req.query.name)
    homeHTML += '<h3>Welcome ' + req.query.name + '!<h3></div';
  else homeHTML += '</div>';

  res.status(200);
  res.send(homeHTML);
});

// PRODUCTS - routes
// Create - Post

// Read - Get

// Update - Put/Patch

// Delete

// CATEGORIES - routes
// Create - Post

// Read - Get

// Update - Put/Patch

// Delete








app.use('*', notFound);

module.exports = {
  server: app,
  start: startServer,
};