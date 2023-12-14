import { render, RenderPosition } from '../render';
import InfoView from '../view/info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import PointView from '../view/point-view';
import EditView from '../view/edit-view';

export default class Presenter {
  headerMainContainer = document.querySelector('.trip-main');
  filterContainer = document.querySelector('.trip-controls__filters');
  tripEventsContainer = document.querySelector('.trip-events');
  ListComponent = new ListView();

  constructor({ model }) {
    this.model = model;
  }

  init() {
    this.points = [...this.model.getPoints()];
    this.offers = [...this.model.getOffers()];
    this.destinations = [...this.model.getDestinations()];

    render(new InfoView, this.headerMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView, this.filterContainer);
    render(new SortView, this.tripEventsContainer);
    render(this.ListComponent, this.tripEventsContainer);

    const editPoint = this.points[0];
    render(new EditView({ point: editPoint }), this.ListComponent.getElement());

    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];
      const pointOffers = [...this.offers.find((offer) => offer.type === this.points[i].type).offers];
      const pointDestination = this.destinations.find((destination) => this.points[i].destination === destination.id);

      render(new PointView({ point, pointOffers, pointDestination }), this.ListComponent.getElement());
    }
  }
}
