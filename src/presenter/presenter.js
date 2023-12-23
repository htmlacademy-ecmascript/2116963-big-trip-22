import { render } from '../framework/render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import PointView from '../view/point-view';
import EditView from '../view/edit-view';
import { replace } from '../framework/render';
import EmptyView from '../view/empty-view';
import { generateFilter } from '../mock/filter';

export default class Presenter {
  #filterContainer = document.querySelector('.trip-controls__filters');
  #tripEventsContainer = document.querySelector('.trip-events');
  #ListComponent = new ListView();
  #model = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #filters = null;

  constructor({ model }) {
    this.#model = model;
  }

  init() {
    this.#points = [...this.#model.points];
    this.#offers = [...this.#model.offers];
    this.#destinations = [...this.#model.destinations];
    this.#filters = generateFilter(this.#points);

    render(new FilterView({filters: this.#filters}), this.#filterContainer);
    render(new SortView, this.#tripEventsContainer);
    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point: point,
      offers: this.#offers,
      destinations: this.#destinations,
      onArrowClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editComponent = new EditView({
      point: point,
      offers: this.#offers,
      destinations: this.#destinations,
      onArrowClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editComponent);
    }

    render(pointComponent, this.#ListComponent.element);
  }

  #renderBoard() {
    if (!this.#points.length) {
      render(new EmptyView(), this.#tripEventsContainer);
      return;
    }

    render(this.#ListComponent, this.#tripEventsContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
