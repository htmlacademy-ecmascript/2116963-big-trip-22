import { render, remove } from '../framework/render';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import EmptyView from '../view/empty-view';
import PointPresenter from './point-presenter';
import { SortType, UpdateType, UserAction } from '../const';
import { sortPointsDay, sortPointsTime, sortPointsPrice } from '../utils/utils';
import {filter} from '../utils/filter.js';

export default class MainPresenter {
  #tripEventsContainer = document.querySelector('.trip-events');
  #listComponent = new ListView();
  #sortComponent = null;
  #pointsModel = null;
  #filterModel = null;
  #offers = [];
  #destinations = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #noPointsComponent = new EmptyView();

  constructor({ pointsModel, filterModel }) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointsDay);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsPrice);
    }
    return filteredPoints;
  }

  init() {
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];
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
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
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
