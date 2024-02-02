import { render, replace, remove, RenderPosition } from '../framework/render.js';
import InfoView from '../view/info-view.js';
import { UpdateType } from '../const.js';

export default class InfoPresenter {
  #infoContainer = document.querySelector('.trip-main');
  #pointsModel = null;
  #infoComponent = null;

  constructor({ pointsModel }) {
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevInfoComponent = this.#infoComponent;

    this.#infoComponent = new InfoView({
      points: this.#pointsModel.points,
      offers: this.#pointsModel.offers,
      destinations: this.#pointsModel.destinations
    });

    if (prevInfoComponent === null) {
      render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.INIT && this.#pointsModel.isFailedToLoad) {
      return;
    }
    this.init();
  };
}
