export default class Model {
  #points = [];
  #offers = [];
  #destinations = [];

  init(points, offers, destinations) {
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
