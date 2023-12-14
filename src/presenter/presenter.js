import { render, RenderPosition } from '../render';
import InfoView from '../view/info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import PointView from '../view/point-view';
import EditView from '../view/edit-view';

export default class Presenter {
  headerMainContainer = document.querySelector('.trip-main');
  filterContainer = document.querySelector('.trip-controls__filters');
  tripEventsContainer = document.querySelector('.trip-events');
  ListComponent = new ListView();

  constructor({ pointsModel }) {
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    render(new InfoView, this.headerMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView, this.filterContainer);
    render(new SortView, this.tripEventsContainer);
    render(this.ListComponent, this.tripEventsContainer);
    render(new EditView, this.ListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView({ point: this.points[i] }), this.ListComponent.getElement());
    }
  }
}
