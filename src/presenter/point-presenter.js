import { render, replace, remove } from '../framework/render';
import PointView from '../view/point-view';
import EditView from '../view/edit-view';
import { UserAction, UpdateType } from '../const';

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
      handleFormSubmit: this.#handleFormSubmit
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
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#editComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editComponent);
    this.#mode = Mode.DEFAULT;
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

  #handleFormSubmit = (point) => {
    this.#handleViewAction(UserAction.UPDATE_TASK, UpdateType.MINOR, point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
