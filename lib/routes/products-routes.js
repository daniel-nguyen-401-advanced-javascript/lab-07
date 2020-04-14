'use strict';

const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/products/products-model.js');

const GenericModel = require('../models/model.js');
const productsSchema = require('../models/products/products-schema.js');
const ProductsModelFromGeneric = new GenericModel(productsSchema);

const logProd = (req, res, next) => {
  console.log('IN products ROUTE');
  next();
};

router.use(logProd);

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
// Read - Get all
router.get('/', async (req, res, next) => {
  let results = await ProductsModel.readByQuery({});
  let count = results.length;

  res.send({count, results});
})

// Read - Get by ID
router.get('/', async (req, res, next) => {
  let results = await ProductsModel.read(req.params.id);

  res.send(results);
})

// Create - Post
router.post('/', async (req, res, next) => {

  let results = await ProductsModel.create(req.body);
  res.send(results)

})
// Update - Put/Patch
router.put('/:id', async (req, res, next) => { 
  
  let modifiedRecord = await ProductsModel.update(req.params.id, req.body);
  res.send(modifiedRecord);
})

// Delete
router.delete('/:id', async (req, res, next) => {
  let results = await ProductsModel.delete(req.params.id);
  res.send('deleted ' + results);
})

module.exports = router;