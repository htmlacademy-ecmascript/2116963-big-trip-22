import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const NoPointsTextValues = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createListTemplate(filterType) {
  const noPointsTextValue = NoPointsTextValues[filterType];
  return `<p class="trip-events__msg">${noPointsTextValue}</p>`;
}

export default class EmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListTemplate(this.#filterType);
  }
}
