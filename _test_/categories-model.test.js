'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);
const categoriesSchema = require('../lib/models/categories/categories-schema.js');
const CategoriesModel = require('../lib/models/categories/categories-model');

describe('categories CRUD tests', () => {
  it('create', async () => {
    let newRecord = {
      "name": "NEW"
    }
    let record = await CategoriesModel.create(newRecord);

    expect(record.name).toBe('NEW');
  });

  it('read', async () => {
    expect(false).toBe(true);
  });

  it('update', async () => {

    expect(false).toBe(true);
  });

  it('delete', async () => {
    
    expect(false).toBe(true);
  });
});