import AbstractView from '../framework/view/abstract-view';
import { DISABLED_SORT_TYPES, SortType } from '../const';

function createSortItemTemplate(type, currentSortType) {
  return(
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${type}"
        data-type="${type}"
        ${currentSortType === type ? 'checked' : ''}
        ${DISABLED_SORT_TYPES.includes(type) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

function createSortTemplate(currentSortType) {
  const sortItemsTemplate = Object.values(SortType).map((type) => createSortItemTemplate(type, currentSortType)).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({handleSortTypeChange, currentSortType}) {
    super();
    this.#handleSortTypeChange = handleSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#onSortClick);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #onSortClick = (evt) => {
    if (evt.target.classList.contains('trip-sort__input')) {
      this.#handleSortTypeChange(evt.target.dataset.type);
    }
  };
}
