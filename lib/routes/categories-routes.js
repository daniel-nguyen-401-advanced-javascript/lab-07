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
// Read - Get
router.get('/categories', (req, res, next) => {
  res.send(data.categories);
})

// Create - Post
router.post('/categories', (req, res, next) => {
  let categories = data.categories;
  let newCategory = req.body;

  newCategory.id = categories.length + 1;
  categories.push(newCategory);

  res.send(newCategory);
})

// Update - Put/Patch
router.put('/categories/:id', (req, res, next) => {
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
router.delete('/categories/:id', (req, res, next) => {
  let categories = data.categories;
  
  data.categories = categories.filter((val) => {
    if (val.id === parseInt(req.params.id))
      return false;
    else 
      return true;
  });
  res.send('deleted ' + req.params.id);
})


module.exports = router;