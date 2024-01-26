import { render, remove } from '../framework/render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import EmptyView from '../view/empty-view';
import { generateFilter } from '../mock/filter';
import PointPresenter from './point-presenter';
import { SortType, UpdateType, UserAction } from '../const';
import { sortPointsDay, sortPointsTime, sortPointsPrice } from '../utils/utils';

export default class MainPresenter {
  #filterContainer = document.querySelector('.trip-controls__filters');
  #tripEventsContainer = document.querySelector('.trip-events');
  #listComponent = new ListView();
  #sortComponent = null;
  #model = null;
  #offers = [];
  #destinations = [];
  #filters = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #noPointsComponent = new EmptyView();

  constructor({ model }) {
    this.#model = model;
    this.#model.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#model.points].sort(sortPointsDay);
      case SortType.TIME:
        return [...this.#model.points].sort(sortPointsTime);
      case SortType.PRICE:
        return [...this.#model.points].sort(sortPointsPrice);
    }
    return this.#model.points;
  }

  init() {
    this.#offers = [...this.#model.offers];
    this.#destinations = [...this.#model.destinations];
    this.#filters = generateFilter(this.points);

    render(new FilterView({ filters: this.#filters }), this.#filterContainer);
    this.#renderBoard();
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      listComponent: this.#listComponent,
      handleViewAction: this.#handleViewAction,
      handleModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#tripEventsContainer);
  }

  #renderBoard() {
    if (this.points.length) {
      this.#renderSort();
      this.#renderPointsList();
    } else {
      this.#renderNoPoints();
    }
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#clearPointsList();
    remove(this.#sortComponent);
    remove(this.#noPointsComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
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
    this.points.forEach((point) => {
      this.#renderPoint(point, this.#offers, this.#destinations);
    });
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#model.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#model.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#model.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.#offers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };
}
