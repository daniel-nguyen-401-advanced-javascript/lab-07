'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    category: {type: 'String', required: true},
    name: { type: 'String', required: true },
    display_name: { type: 'String'},
    description: { type: 'String'},
});

// Mongoose is creating a model
// that model has access to MongoDB operations
// like .save(), .find(), etc.
const model = mongoose.model('products', schema);
module.exports = model;