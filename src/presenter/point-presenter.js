import { render, replace, remove } from '../framework/render';
import PointView from '../view/point-view';
import EditView from '../view/edit-view';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #editComponent = null;
  #point = null;
  #offers = [];
  #destinations = [];
  #handlePointChange = null;

  constructor({ listComponent, handlePointChange }) {
    this.#listComponent = listComponent;
    this.#handlePointChange = handlePointChange;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onArrowClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editComponent = new EditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onArrowClick: () => {
        this.#replaceFormToPoint();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFormSubmit: this.#handleFormSubmit
    });

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#listComponent.element);
      return;
    }

    if (this.#listComponent.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#listComponent.element.contains(prevPointComponent.element)) {
      replace(this.#editComponent, prevEditComponent);
    }
    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#editComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editComponent);
  }

  #handleFavoriteClick = () => {
    this.#handlePointChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleFormSubmit = (point) => {
    this.#handlePointChange(point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
