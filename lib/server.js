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
// Read - Get
app.get('/products', (req, res, next) => {
  res.send(data.products);
})

// Create - Post
app.post('/products', (req, res, next) => {
  let products = data.products;
  let newProduct = req.body;

  newProduct.id = products.length + 1;
  products.push(newProduct);

  res.send(newProduct);
})
// Update - Put/Patch
app.put('/products/:id', (req, res, next) => {
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
  data.products[parseInt(req.params.id) -1] = {
    ...req.body,
    id: parseInt(req.params.id),
  };
  res.send(data.categories[parseInt(req.params.id) -1]);
})

// Delete







// 404 route
app.use('*', notFound);

module.exports = {
  server: app,
  start: startServer,
};