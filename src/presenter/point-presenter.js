import { render, replace, remove } from '../framework/render';
import PointView from '../view/point-view';
import EditView from '../view/edit-view';
import { UserAction, UpdateType } from '../const';
import { isDatesEqual } from '../utils/utils';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #editComponent = null;
  #point = null;
  #offers = [];
  #destinations = [];
  #handleViewAction = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ listComponent, handleViewAction, handleModeChange }) {
    this.#listComponent = listComponent;
    this.#handleViewAction = handleViewAction;
    this.#handleModeChange = handleModeChange;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      handleArrowClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      handleFavoriteClick: this.#handleFavoriteClick
    });

    this.#editComponent = new EditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      handleArrowClick: () => {
        this.#replaceFormToPoint();
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      handleFormSubmit: this.#handleFormSubmit,
      handleDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#listComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    } else if (this.#mode === Mode.EDITING) {
      replace(this.#editComponent, prevEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#editComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
    replace(this.#editComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    this.#mode = Mode.DEFAULT;
    this.#editComponent.reset(this.#point);
    replace(this.#pointComponent, this.#editComponent);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleViewAction(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  };

  #handleFormSubmit = (update) => {
    const isPatchUpdate = isDatesEqual(this.#point.dateFrom, update.dateFrom) && isDatesEqual(this.#point.dateTo, update.dateTo);
    this.#handleViewAction(
      UserAction.UPDATE_POINT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update
    );
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleDeleteClick = (point) => {
    this.#handleViewAction(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
