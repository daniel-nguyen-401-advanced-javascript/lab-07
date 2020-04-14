'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);

describe('products routes work', () => {
    it('can get products', async () => {
        let response = await mockRequest.get('/products');

        expect(JSON.stringify(response.body)).toBe(
            JSON.stringify([
                {
                    id: 1,
                    category: 'utensils',
                    name: 'sharp knife',
                    display_name: 'Hattori Hanzo Blade',
                    description: 'Quentin Tarantino makes weird movies. ... At one point in the homage to kung fu action films, she travels to Japan to visit a character named Hattori Hanzo, who once created legendary samurai swords of unparalleled quality. But he swore an oath to stop making them',
                },
                {
                    id: 2,
                    category: 'flatware',
                    name: 'very flat plate',
                    display_name: 'Salt Flats Eatin Mat',
                    description: 'The Bonneville Salt Flats are a densely packed salt pan in Tooele County in northwestern Utah. The area is a remnant of the Pleistocene Lake Bonneville and is the largest of many salt flats located west of the Great Salt Lake. This plate looks like that mkay.',
                },
            ]),
        );

        expect(response.status).toBe(200);
    });

    it('can update a product', async () => {
        let newProductData = {
            category: 'test product',
            name: 'new product',
            display_name: 'new product display',
            description: 'test description',
        };

        let response = await mockRequest.put('/products/1').send(newProductData);

        expect(JSON.stringify(response.body)).toBe(
            JSON.stringify({ category: 'test product', name: 'new product', display_name: 'new product display', description: 'test description', id: 1 }),
        );

        expect(response.status).toBe(200);
    });

    it('can post a product', async () => {
      let newProductData = {
        category: 'test product',
        name: 'new product',
        display_name: 'new product display',
        description: 'test description'
    };

    let response = await mockRequest.post('/products').send(newProductData);

    expect(JSON.stringify(response.body)).toBe(JSON.stringify({category: 'test product', name: 'new product', display_name: 'new product display', description: 'test description', id: 3 }))
  });

  it('can delete a product', async () => {
  
    expect(false).toBe(true);
});
});


describe('categories routes work', () => {
  it('can get categories', async () => {
      let response = await mockRequest.get('/categories');

      expect(JSON.stringify(response.body)).toBe(
          JSON.stringify([
            {
              id: 1,
              name: 'utensils',
              display_name: 'cutlery',
              description: 'things folks use to eat food',
            },
            {
              id: 2,
              name: 'flatware',
              display_name: 'plates',
              description: 'dishes, plates, tableware, things you eat on',
            } 
          ]),
      );

      expect(response.status).toBe(200);
  });

  it('can update a category', async () => {
 
    let newCategoryData = {
      name: 'new category',
      display_name: 'new display name',
      description: 'test description',
    };

    let response = await mockRequest.put('/categories/1').send(newCategoryData);
    
    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ name: 'new category',
      display_name: 'new display name',
      description: 'test description', id: '1'}),
    );

    expect(response.status).toBe(200);
    
    });
  });

describe('middleware works', () => {
  it("gives 404 error when accessing route that doesn't exist", async () => {
      let response = await mockRequest.post('/blah');
      expect(response.status).toBe(404);
  });
});

