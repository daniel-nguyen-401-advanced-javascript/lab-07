'use strict';

const express = require('express');

// verify path on data
let data = require('../db.json');
//
const notFound = require('./middleware/404.js');
const timestamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger');
const serverError = require('./middleware/500.js');
const generateSwagger = require('../docs/swagger.js');

const app = express();

generateSwagger(app);

//middleware
app.use(express.json());
app.use(timestamp);
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
// Read - Get
app.get('/products', (req, res, next) => {
  res.send(data.products);
})

// Create - Post
app.post('/products', (req, res, next) => {
  let newProduct = req.body;

  newProduct.id = data.products.length + 1;
  data.products.push(newProduct);

  res.send(newProduct);
})
// Update - Put/Patch
app.put('/products/:id', (req, res, next) => { 
  // wrong
  data.products[parseInt(req.params.id) -1] = {
    ...req.body,
    id: parseInt(req.params.id),
  };
  res.send(data.products[parseInt(req.params.id) -1]);
})

// Delete
app.delete('/products/:id', (req, res, next) => {
  let products = data.products;

  data.products = products.filter(val => {
    if (val.id === parseInt(req.params.id)) 
      return false;
    else 
      return true;
  });
  res.send('deleted ' + req.params.id);
})

// CATEGORIES - routes
// Read - Get
app.get('/categories', (req, res, next) => {
  res.send(data.categories);
})

// Create - Post
app.post('/categories', (req, res, next) => {
  let categories = data.categories;
  let newCategory = req.body;

  newCategory.id = categories.length + 1;
  categories.push(newCategory);

  res.send(newCategory);
})

// Update - Put/Patch
app.put('/categories/:id', (req, res, next) => {
  // if (req.params.id > data.categories.length) {
  //   next();
  //   return;
  // }

  let modifiedRecord = req.body;
  modifiedRecord.id = req.params.id;

  data.categories[req.params.id -1] = modifiedRecord;
  res.send(modifiedRecord);
})

// Delete
app.delete('/categories/:id', (req, res, next) => {
  let categories = data.categories;
  
  data.categories = categories.filter((val) => {
    if (val.id === parseInt(req.params.id))
      return false;
    else 
      return true;
  });
  res.send('deleted ' + req.params.id);
})


// 404 route
app.use('*', notFound);

// 500 route
app.use(serverError);

module.exports = {
  server: app,
  start: startServer,
};