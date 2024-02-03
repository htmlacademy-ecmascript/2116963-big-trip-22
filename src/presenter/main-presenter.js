import { render, remove, replace } from '../framework/render';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType, UiBlockTimeLimit } from '../const';
import { sortPointsDay, sortPointsTime, sortPointsPrice } from '../utils/utils';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
import FailView from '../view/fail-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class MainPresenter {
  #listContainer = document.querySelector('.trip-events');
  #listComponent = new ListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #pointsModel = null;
  #filterModel = null;
  #offers = [];
  #destinations = [];
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #noPointsComponent = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: UiBlockTimeLimit.LOWER_LIMIT,
    upperLimit: UiBlockTimeLimit.UPPER_LIMIT
  });

  constructor({ pointsModel, filterModel }) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      listComponent: this.#listComponent,
      pointsModel: this.#pointsModel,
      handleViewAction: this.#handleViewAction,
      createPoint: this.#createPoint,
      renderNoPoints: this.#renderNoPoints
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

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

  #renderLoading() {
    render(this.#loadingComponent, this.#listContainer);
  }

  #renderNewButton() {
    this.#newPointPresenter.renderNewButton();
  }

  #renderNoPoints = () => {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType
    });
    render(this.#noPointsComponent, this.#listContainer);
  };

  #renderBoard() {
    const points = this.points;
    if (this.#isLoading) {
      this.#renderLoading();
    } else if (points.length) {
      this.#renderSort();
      this.#renderPointsList(points);
    } else {
      this.#renderNoPoints();
    }
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#clearPointsList();
    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      handleSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#listContainer);
  }

  #renderPointsList(points) {
    render(this.#listComponent, this.#listContainer);
    points.forEach((point) => {
      this.#renderPoint(point, this.#offers, this.#destinations);
    });
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #createPoint = () => {
    this.#pointPresenters.forEach((presenter) => presenter.removeEsc());
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (!this.#pointsModel.points.length) {
      replace(this.#listComponent, this.#noPointsComponent);
    }
    this.#newPointPresenter.init(this.#offers, this.#destinations);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#offers = [...this.#pointsModel.offers];
        this.#destinations = [...this.#pointsModel.destinations];
        if (this.#pointsModel.isFailedToLoad) {
          replace(new FailView(), this.#loadingComponent);
        } else {
          this.#isLoading = false;
          this.#renderNewButton();
          this.#renderBoard();
        }
        remove(this.#loadingComponent);
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList(this.points);
  };
}
