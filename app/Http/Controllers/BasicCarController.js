'use strict';

const Car = use('App/Model/Car');
const attributes = ['name', 'year', 'hp', 'price', 'brand_id'];

class BasicCarController {

  * index(request, response) {
    const collection = request.param('collection');
    const cars = yield Car.with('brand').where({ collection }).fetch();

    response.send(cars);
  }

  * store(request, response) {
    const input = request.only(attributes);
    input.collection = request.param('collection');
    const car = yield Car.create(input);

    response.send(car);
  }

  * show(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');
    const car = yield Car.with('brand').where({ id, collection }).firstOrFail();

    response.send(car);
  }

  * update(request, response) {
    const collection = request.param('collection');
    const input = request.only(attributes);
    const id = request.param('id');

    const car = yield Car.with('brand').where({ id, collection }).firstOrFail();
    car.fill(input);
    yield car.save(input);

    response.send(car);
  }

  * destroy(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');
    const car = yield Car.query().where({ id, collection }).firstOrFail();
    yield car.delete();

    response.status(204).send();
  }

}

module.exports = BasicCarController;
