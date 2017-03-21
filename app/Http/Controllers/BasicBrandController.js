'use strict';

const Brand = use('App/Model/Brand');
const attributes = ['name', 'country'];

class BasicBrandController {

  * index(request, response) {
    const collection = request.param('collection');
    const brands = yield Brand.with('cars').where({ collection }).fetch();

    response.send(brands);
  }

  * store(request, response) {
    const input = request.only(attributes);
    input.collection = request.param('collection');

    const brand = yield Brand.create(input);

    yield brand.related('cars').load();

    response.send(brand);
  }

  * show(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');
    const brand = yield Brand.with('cars').where({ id, collection }).firstOrFail();

    response.send(brand);
  }

  * update(request, response) {
    const collection = request.param('collection');
    const input = request.only(attributes);
    const id = request.param('id');

    const brand = yield Brand.with('cars').where({ id, collection }).firstOrFail();
    brand.fill(input);
    yield brand.save(input);

    response.send(brand);
  }

  * destroy(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');
    const brand = yield Brand.query().where({ id, collection }).firstOrFail();
    yield brand.delete();

    response.status(204).send();
  }

}

module.exports = BasicBrandController;
