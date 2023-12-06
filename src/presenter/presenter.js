import { render, RenderPosition } from '../render';
import InfoView from '../view/info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import TripListView from '../view/trip-list-view';
import TripItemView from '../view/trip-item-view';
import TripEditView from '../view/trip-edit-view';

export default class Presenter {
  headerMainContainer = document.querySelector('.trip-main');
  filterContainer = document.querySelector('.trip-controls__filters');
  tripEventsContainer = document.querySelector('.trip-events');
  tripListComponent = new TripListView();

  init() {
    render(new InfoView, this.headerMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView, this.filterContainer);
    render(new SortView, this.tripEventsContainer);
    render(this.tripListComponent, this.tripEventsContainer);
    render(new TripEditView, this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripItemView, this.tripListComponent.getElement());
    }
  }
}
