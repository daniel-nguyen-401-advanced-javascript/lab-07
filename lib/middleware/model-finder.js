'use strict';
const productsSchema = require('../models/products/products-schema.js');
const categoriesSchema = require('../models/categories/categories-schema.js');
// const departmentSchema = require('../models/departments-schema.js');
const Model = require('../models/model.js');

const modelFinder = (req, res, next) => {
    // valid models are: 'products' and 'categories'

    console.log('Run Route Middleware (modelFinder, setting req.colModel)');

    switch (req.params.model) {
        case 'products':
            console.log('found model products');
            req.colModel = new Model(productsSchema);
            next();
            break;
        case 'categories':
            console.log('found model categories');
            req.colModel = new Model(categoriesSchema);
            next();
            break;
        // case 'departments':
        //     console.log('found model departments');
        //     req.colModel = new Model(departmentSchema);
        //     next();
        //     break;
        default:
            console.log('invalid model');
            res.status(404);
            res.end();
            break;
    }
};

module.exports = modelFinder;