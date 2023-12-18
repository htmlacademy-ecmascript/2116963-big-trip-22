export default class Model {
  constructor() {
    this.points = [];
    this.offers = [];
    this.destinations = [];
  }

  init(points, offers, destinations) {
    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
