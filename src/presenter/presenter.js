import { render } from '../framework/render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import EmptyView from '../view/empty-view';
import { generateFilter } from '../mock/filter';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/utils';

export default class Presenter {
  #filterContainer = document.querySelector('.trip-controls__filters');
  #tripEventsContainer = document.querySelector('.trip-events');
  #listComponent = new ListView();
  #model = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #filters = [];
  #pointPresenters = new Map();

  constructor({ model }) {
    this.#model = model;
  }

  init() {
    this.#points = [...this.#model.points];
    this.#offers = [...this.#model.offers];
    this.#destinations = [...this.#model.destinations];
    this.#filters = generateFilter(this.#points);

    render(new FilterView({ filters: this.#filters }), this.#filterContainer);
    render(new SortView(), this.#tripEventsContainer);
    this.#renderBoard();
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      listComponent: this.#listComponent,
      handlePointChange: this.#handlePointChange
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderBoard() {
    if (this.#points.length) {
      render(this.#listComponent, this.#tripEventsContainer);
      this.#points.forEach((point) => {
        this.#renderPoint(point, this.#offers, this.#destinations);
      });
    } else {
      render(new EmptyView(), this.#tripEventsContainer);
    }
  }

  #clearList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };
}
