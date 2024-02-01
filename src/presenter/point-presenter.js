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
      handleArrowClick: this.#replacePointToForm,
      handleFavoriteClick: this.#handleFavoriteClick
    });

    this.#editComponent = new EditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      handleArrowClick:  this.#replaceFormToPoint,
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
      replace(this.#pointComponent, prevEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  removeEsc() {
    if (this.#mode === Mode.EDITING) {
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#replaceFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#editComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editComponent.shake(resetFormState);
  }

  #replacePointToForm = () => {
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToPoint = () => {
    this.#mode = Mode.DEFAULT;
    this.#editComponent.reset(this.#point);
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleViewAction(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  };

  #handleFormSubmit = (update) => {
    const isPatchUpdate = isDatesEqual(this.#point.dateFrom, update.dateFrom)
     && isDatesEqual(this.#point.dateTo, update.dateTo)
     && this.#point.basePrice === update.basePrice;
    this.#handleViewAction(
      UserAction.UPDATE_POINT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update
    );
    // this.#replaceFormToPoint();
  };

  #handleDeleteClick = (point) => {
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#handleViewAction(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
