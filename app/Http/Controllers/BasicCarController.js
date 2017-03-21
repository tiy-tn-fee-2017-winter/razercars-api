'use strict';

const BasicCar = use('App/Model/BasicCar');
const attributes = ['name', 'year', 'hp', 'price', 'brand_id'];

class BasicCarController {

  * index(request, response) {
    const collection = request.param('collection');
    const basicCars = yield BasicCar.with('brand').where({ collection }).fetch();

    response.send(basicCars);
  }

  * store(request, response) {
    const input = request.only(attributes);
    input.collection = request.param('collection');
    const basicCar = yield BasicCar.create(input);

    response.send(basicCar);
  }

  * show(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');
    const basicCar = yield BasicCar.with('brand').where({ id, collection }).firstOrFail();

    response.send(basicCar);
  }

  * update(request, response) {
    const collection = request.param('collection');
    const input = request.only(attributes);
    const id = request.param('id');

    const basicCar = yield BasicCar.with('brand').where({ id, collection }).firstOrFail();
    basicCar.fill(input);
    yield basicCar.save(input);

    response.send(basicCar);
  }

  * destroy(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');
    const basicCar = yield BasicCar.query().where({ id, collection }).firstOrFail();
    yield basicCar.delete();

    response.status(204).send();
  }

}

module.exports = BasicCarController;
