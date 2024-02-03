import { remove, render, RenderPosition, replace } from '../framework/render.js';
import EditView from '../view/edit-view.js';
import { UserAction, UpdateType } from '../const.js';
import NewButtonView from '../view/new-button-view.js';

export default class NewPointPresenter {
  #listComponent = null;
  #pointsModel = null;
  #renderNoPoints = null;

  #handleViewAction = null;
  #createPoint = null;
  #editComponent = null;
  #newButtonContainer = document.querySelector('.trip-main');
  #newButtonComponent = null;

  constructor({ listComponent, pointsModel, handleViewAction, createPoint, renderNoPoints }) {
    this.#listComponent = listComponent;
    this.#pointsModel = pointsModel;
    this.#renderNoPoints = renderNoPoints;
    this.#handleViewAction = handleViewAction;
    this.#createPoint = createPoint;
    this.#newButtonComponent = new NewButtonView({
      handleNewButtonClick: this.#handleNewButtonClick,
    });
  }

  init(offers, destinations) {
    if (this.#editComponent === null) {
      this.#editComponent = new EditView({
        offers,
        destinations,
        handleFormSubmit: this.#handleFormSubmit,
        handleDeleteClick: this.#handleDeleteClick
      });
      if (this.#listComponent === null) {
        replace();
      }
      render(this.#editComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#onEscKeyDown);
    }
  }

  renderNewButton() {
    render(this.#newButtonComponent, this.#newButtonContainer);
  }

  destroy() {
    if (this.#editComponent === null) {
      return;
    }
    this.#handleNewPointClose();
    remove(this.#editComponent);
    this.#editComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
    if (!this.#pointsModel.points.length) {
      this.#renderNoPoints();
    }
  }

  setSaving() {
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#editComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    document.addEventListener('keydown', this.#onEscKeyDown);
    const resetFormState = () => {
      if (this.#editComponent) {
        this.#editComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      }
    };
    try {
      this.#editComponent.shake(resetFormState);
    } catch(err) {
      new Error('Can\'t shake');
    }
  }

  #handleFormSubmit = (point) => {
    this.#handleViewAction(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleNewPointClose() {
    this.#newButtonComponent.element.disabled = false;
  }

  #handleNewButtonClick = () => {
    this.#createPoint();
    this.#newButtonComponent.element.disabled = true;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
