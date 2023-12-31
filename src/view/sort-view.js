import AbstractView from '../framework/view/abstract-view';
import { DISABLED_SORT_TYPES } from '../const';

function createSortItemTemplate(sortItem, isChecked) {
  const {type} = sortItem;

  return(
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${type}"
        ${isChecked ? 'checked' : ''}
        ${DISABLED_SORT_TYPES.includes(type) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

function createSortTemplate(sortItems) {
  const sortItemsTemplate = sortItems.map((sortItem, index) => createSortItemTemplate(sortItem, index === 0)).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #sortItems = [];

  constructor({sortItems}) {
    super();
    this.#sortItems = sortItems;
  }

  get template() {
    return createSortTemplate(this.#sortItems);
  }
}
