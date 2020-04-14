'use strict';

const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/products/products-model.js');

const GenericModel = require('../models/model.js');
const productsSchema = require('../models/products/products-schema.js');
const ProductsModelFromGeneric = new GenericModel(productsSchema);

/**
 * This route gives us all the products
 * @route GET /products
 * @group products
 * @returns {array} 200 - A list of records that are in the products collection
 */
// router.get('', async (req, res, next) => {
//     let results = await ProductsModelFromGeneric.readByQuery({});

//     res.send(results);
// });

// router.get('/:id', async (req, res, next) => {
//     let record = await ProductsModelFromGeneric.read(req.params.id);
//     res.send(record);
// });


// PRODUCTS - routes
// Read - Get
router.get('/products', (req, res, next) => {
  res.send(data.products);
})

// Create - Post
router.post('/products', (req, res, next) => {
  let newProduct = req.body;

  newProduct.id = data.products.length + 1;
  data.products.push(newProduct);

  res.send(newProduct);
})
// Update - Put/Patch
router.put('/products/:id', (req, res, next) => { 
  // wrong
  data.products[parseInt(req.params.id) -1] = {
    ...req.body,
    id: parseInt(req.params.id),
  };
  res.send(data.products[parseInt(req.params.id) -1]);
})

// Delete
router.delete('/products/:id', (req, res, next) => {
  let products = data.products;

  data.products = products.filter(val => {
    if (val.id === parseInt(req.params.id)) 
      return false;
    else 
      return true;
  });
  res.send('deleted ' + req.params.id);
})

module.exports = router;