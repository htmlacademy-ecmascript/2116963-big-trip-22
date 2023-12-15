import { mockPoints } from '../mock/points';
import { mockOffers } from '../mock/offers';
import { mockDestinations } from '../mock/destinations';

export default class Model {
  constructor() {
    this.points = [];
    this.offers = [];
    this.destinations = [];
  }

  init() {
    this.points = mockPoints;
    this.offers = mockOffers;
    this.destinations = mockDestinations;
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
