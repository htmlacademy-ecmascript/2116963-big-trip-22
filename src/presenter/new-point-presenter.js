import { remove, render, RenderPosition } from '../framework/render.js';
import EditView from '../view/edit-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';
import NewButtonView from '../view/new-button-view.js';

export default class NewPointPresenter {
  #listComponent = null;
  #handleViewAction = null;
  #createPoint = null;
  #editComponent = null;
  #newButtonContainer = document.querySelector('.trip-main');
  #newButtonComponent = null;

  constructor({ listComponent, handleViewAction, createPoint }) {
    this.#listComponent = listComponent;
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
  }

  #handleFormSubmit = (point) => {
    this.#handleViewAction(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...point, id: nanoid() },
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleNewPointClose() {
    this.#newButtonComponent.element.disabled = false;
  }

  #handleNewButtonClick = () => {
    this.#createPoint();
    this.#newButtonComponent.element.disabled = true;
  };
}
