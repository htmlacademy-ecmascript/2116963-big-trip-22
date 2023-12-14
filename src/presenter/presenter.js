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

    render(new InfoView({ points: this.points, destinations: this.destinations }), this.headerMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView, this.filterContainer);
    render(new SortView, this.tripEventsContainer);
    render(this.ListComponent, this.tripEventsContainer);

    render(new EditView({ point: this.points[0] }), this.ListComponent.getElement());

    for (let i = 1; i < this.points.length; i++) {
      render(new PointView(
        {
          point: this.points[i],
          offers: this.offers,
          destinations: this.destinations
        }
      ), this.ListComponent.getElement());
    }
  }
}
