import AbstractView from '../framework/view/abstract-view.js';

function createNewButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewButtonView extends AbstractView {
  #handleNewButtonClick = null;

  constructor({ handleNewButtonClick }) {
    super();
    this.#handleNewButtonClick = handleNewButtonClick;
    this.element.addEventListener('click', this.#onNewButtonClick);
  }

  get template() {
    return createNewButtonTemplate();
  }

  #onNewButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleNewButtonClick();
  };
}
