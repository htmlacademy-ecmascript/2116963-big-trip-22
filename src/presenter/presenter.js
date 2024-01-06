import { render } from '../framework/render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import EmptyView from '../view/empty-view';
import { generateFilter } from '../mock/filter';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/utils';
import { SortType } from '../const';
import { sortPointsTime, sortPointsPrice } from '../utils/utils';

export default class Presenter {
  #filterContainer = document.querySelector('.trip-controls__filters');
  #tripEventsContainer = document.querySelector('.trip-events');
  #listComponent = new ListView();
  #sortComponent = null;
  #model = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #filters = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor({ model }) {
    this.#model = model;
  }

  init() {
    this.#points = [...this.#model.points];
    this.#sourcedPoints = [...this.#model.points];
    this.#offers = [...this.#model.offers];
    this.#destinations = [...this.#model.destinations];
    this.#filters = generateFilter(this.#points);

    render(new FilterView({ filters: this.#filters }), this.#filterContainer);
    this.#renderBoard();
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      listComponent: this.#listComponent,
      handlePointChange: this.#handlePointChange,
      handleModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderBoard() {
    if (this.#points.length) {
      this.#renderSort();
      this.#renderPointsList();
    } else {
      render(new EmptyView(), this.#tripEventsContainer);
    }
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      handleSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderPointsList() {
    render(this.#listComponent, this.#tripEventsContainer);
    this.#points.forEach((point) => {
      this.#renderPoint(point, this.#offers, this.#destinations);
    });
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortPointsTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointsPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };
}
