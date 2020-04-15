'use strict';

//esoteric resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const productsRouter = require('./routes/products-routes.js');
// const categoriesRouter = require('./routes/categories-routes.js');
const modelRouter = require('./routes/model-routes.js');
const modelFinder = require('./middleware/model-finder.js');

// verify path on data
//dunno if i need this if we are using mongodb database
let data = require('../db.json');
//
const notFound = require('./middleware/404.js');
// const timestamp = require('./middleware/timestamp.js');
// const logger = require('./middleware/logger');
// const serverError = require('./middleware/500.js');
const generateSwagger = require('../docs/swagger.js');

const app = express();

generateSwagger(app);

//middleware for server instantiation
app.use(express.json());
// app.use(timestamp);
// app.use(logger);

const startServer = (port, mongodb) => {

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(mongodb, options);

  app.listen(port, () => {
    console.log('Server up on port', port);
  });
};

app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('runs custom middleware');
  next();
});


//routes

/**
 * This route give us a standard Homepage message
 * @route GET /
 * @group Non-API
 * @returns {string} 200 - The string "This is the homepage"
 */
app.get('/', (req, res, next) => {

  let homeHTML = '<div><h1>This is the homepage</h1>';

  if (req.query.name)
    homeHTML += '<h3>Welcome ' + req.query.name + '!<h3></div';
  else homeHTML += '</div>';

  res.status(200);
  res.send(homeHTML);
});

// app.use('/api/v1/products', productsRouter);
// app.use('/api/v1/categories', categoriesRouter);

// app.use(modelFinder);
app.use('/api/v1', modelRouter);

// // 404 route
app.use('*', notFound);

// // 500 route
// app.use(serverError);

module.exports = {
  server: app,
  start: startServer,
};