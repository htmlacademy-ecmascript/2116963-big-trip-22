import AbstractView from '../framework/view/abstract-view';
import { DISABLED_SORT_TYPES, SortType } from '../const';

function createSortItemTemplate(type, isChecked) {
  return(
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden event"
        type="radio" name="trip-sort"
        value="sort-${type}"
        data-type="${type}"
        ${isChecked ? 'checked' : ''}
        ${DISABLED_SORT_TYPES.includes(type) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

function createSortTemplate() {
  const sortItemsTemplate = Object.values(SortType).map((type, index) => createSortItemTemplate(type, index === 0)).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({handleSortTypeChange}) {
    super();
    this.#handleSortTypeChange = handleSortTypeChange;

    this.element.addEventListener('click', this.#onSortClick);
  }

  get template() {
    return createSortTemplate();
  }

  #onSortClick = (evt) => {
    if (evt.target.classList.contains('event')) {
      this.#handleSortTypeChange(evt.target.dataset.type);
    }
  };
}
