'use strict';

const Car = use('App/Model/Car');
const attributes = ['name', 'year', 'hp', 'price', 'brand_id'];

class BasicCarController {

  * index(request, response) {
    const collection = request.param('collection');
    const basicCars = yield Car.with('brand').where({ collection }).fetch();

    response.send(basicCars);
  }

  * store(request, response) {
    const input = request.only(attributes);
    input.collection = request.param('collection');
    const basicCar = yield Car.create(input);

    response.send(basicCar);
  }

  * show(request, response) {
    const id = request.param('id');
    const collection = request.param('collection');
    const basicCar = yield Car.with('brand').where({ id, collection }).firstOrFail();

    response.send(basicCar);
  }

  * update(request, response) {
    const collection = request.param('collection');
    const input = request.only(attributes);
    const id = request.param('id');

    const basicCar = yield Car.with('brand').where({ id, collection }).firstOrFail();
    basicCar.fill(input);
    yield basicCar.save(input);

    response.send(basicCar);
  }

  * destroy(request, response) {
    const collection = request.param('collection');
    const id = request.param('id');
    const basicCar = yield Car.query().where({ id, collection }).firstOrFail();
    yield basicCar.delete();

    response.status(204).send();
  }

}

module.exports = BasicCarController;
