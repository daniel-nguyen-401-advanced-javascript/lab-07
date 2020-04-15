'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);
const productsSchema = require('../lib/models/products/products-schema.js');
const ProductsModel = require('../lib/models/products/products-model');

describe('products CRUD tests', () => {
  it('create', async () => {
    let newProduct = {
      "name": "test",
      "category": "test"
    }
    let record = await ProductsModel.create(newProduct);

    expect(record.name).toBe('test');
  });

  it('read', async () => {

    await ProductsModel.create({
      "name": "1",
      "category": "test"
    });

    await ProductsModel.create({
      "name": "2",
      "category": "test"
    });

    let record = await ProductsModel.read();

    expect(record.length).toBe(2);
  });

  it('update', async () => {


    expect(false).toBe(true);
  });

  it('delete', async () => {
    
    expect(false).toStrictEqual(true);
  });
});