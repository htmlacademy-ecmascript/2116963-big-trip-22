import AbstractView from '../framework/view/abstract-view.js';

function createFailTemplate() {
  return (
    '<p class="trip-events__msg">Failed to load latest route information</p>'
  );
}

export default class FailView extends AbstractView {

  get template() {
    return createFailTemplate();
  }
}
