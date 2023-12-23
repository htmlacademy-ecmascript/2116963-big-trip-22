import AbstractView from '../framework/view/abstract-view';

function createListTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyView extends AbstractView {
  get template() {
    return createListTemplate();
  }
}
