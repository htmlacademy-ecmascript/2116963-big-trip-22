import { render } from '../render';
import FilterView from '../view/filter-view';

const filterContainer = document.querySelector('.trip-controls__filters');

export default class Presenter {
  init() {
    render(new FilterView, filterContainer);
  }
}
