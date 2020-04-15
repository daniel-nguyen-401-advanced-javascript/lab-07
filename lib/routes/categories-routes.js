'use strict';

const express = require('express');
const router = express.Router();
const CategoriesModel = require('../models/categories/categories-model.js');

const logCat = (req, res, next) => {
    console.log('IN categories ROUTE');
    next();
};

router.use(logCat);

// router.get('', async (req, res, next) => {
//     // do something to get all categories
//     let results = await CategoriesModel.readByQuery({});
//     res.send(results);
// });

// router.get('/legume', (req, res, next) => {
//     // do something to get all categories
//     res.send('getting legume veggies');
// });

// CATEGORIES - routes
// Read - Get all
router.get('/', async (req, res, next) => {
  let results = await CategoriesModel.readByQuery({});
  let count = results.length;

  res.send({count, results});
});

// Read - Get by ID
router.get('/:id', async (req, res, next) => {
  let results = await CategoriesModel.read(req.params.id);

  res.send(results);
});

// Create - Post
router.post('/', async (req, res, next) => {

  let results = await CategoriesModel.create(req.body);
  res.send(results)

});

// Update - Put/Patch
router.put('/:id', async (req, res, next) => {
  // if (req.params.id > data.categories.length) {
  //   next();
  //   return;
  // }

  let modifiedRecord = await CategoriesModel.update(req.params.id, req.body);
  res.send(modifiedRecord);
});

// Delete
router.delete('/:id', async (req, res, next) => {
  let results = await CategoriesModel.delete(req.params.id);
  res.send('deleted ' + results);
});


module.exports = router;