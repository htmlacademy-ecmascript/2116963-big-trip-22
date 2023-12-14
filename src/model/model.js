import { mockPoints } from '../mock/points';
import { mockOffers } from '../mock/offers';
import { mockDestinations } from '../mock/destinations';

export default class Model {
  points = mockPoints;
  offers = mockOffers;
  destinations = mockDestinations;

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
