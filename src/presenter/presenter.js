import { render } from '../framework/render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import PointView from '../view/point-view';
import EditView from '../view/edit-view';

export default class Presenter {
  #filterContainer = document.querySelector('.trip-controls__filters');
  #tripEventsContainer = document.querySelector('.trip-events');
  #ListComponent = new ListView();
  #model = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({ model }) {
    this.#model = model;
  }

  init() {
    this.#points = [...this.#model.points];
    this.#offers = [...this.#model.offers];
    this.#destinations = [...this.#model.destinations];

    render(new FilterView, this.#filterContainer);
    render(new SortView, this.#tripEventsContainer);
    render(this.#ListComponent, this.#tripEventsContainer);

    render(new EditView({
      point: {},
      offers: this.#offers,
      destinations: this.#destinations
    }), this.#ListComponent.element);

    render(new EditView({
      point: this.#points[0],
      offers: this.#offers,
      destinations: this.#destinations
    }), this.#ListComponent.element);

    this.#points.forEach((point) => {
      render(new PointView({
        point: point,
        offers: this.#offers,
        destinations: this.#destinations
      }), this.#ListComponent.element);
    });
  }
}
