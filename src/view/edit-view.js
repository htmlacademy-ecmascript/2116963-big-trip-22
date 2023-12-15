import { createElement } from '../render';
import { TRAVEL_TYPES, DateFormats, ResetButtons } from '../const';
import { formatDate } from '../utils';

function createTypeList(pointType, id) {
  return TRAVEL_TYPES.map((type) => {
    const checked = type === pointType ? 'checked' : '';
    return (
      `<div class="event__type-item">
         <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
         <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
       </div>`
    );
  }).join('');
}

function createEditTemplate(point, offers, destinations) {
  const { id = 0, basePrice, dateFrom, dateTo, destination, isFavorite, offers: checkedOffers, type } = point;
  const pointOffers = [...offers.find((offer) => offer.type === type).offers];
  const pointDestination = destinations.find((item) => destination === item.id);
  const activeClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypeList(type, id)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${destinations.map((item) => `<option value="${item.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatDate(dateFrom, DateFormats.DAY_TIME)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatDate(dateTo, DateFormats.DAY_TIME)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${id === 0 ? ResetButtons.CANCEL : ResetButtons.DELETE}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" checked>
                <label class="event__offer-label" for="event-offer-luggage-${id}">
                  <span class="event__offer-title">Add luggage</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">50</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${id}" type="checkbox" name="event-offer-comfort" checked>
                <label class="event__offer-label" for="event-offer-comfort-${id}">
                  <span class="event__offer-title">Switch to comfort</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">80</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${id}" type="checkbox" name="event-offer-meal">
                <label class="event__offer-label" for="event-offer-meal-${id}">
                  <span class="event__offer-title">Add meal</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">15</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${id}" type="checkbox" name="event-offer-seats">
                <label class="event__offer-label" for="event-offer-seats-${id}">
                  <span class="event__offer-title">Choose seats</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">5</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-${id}" type="checkbox" name="event-offer-train">
                <label class="event__offer-label" for="event-offer-train-${id}">
                  <span class="event__offer-title">Travel by train</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">40</span>
                </label>
              </div>
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EditView {
  constructor({ point, offers, destinations }) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEditTemplate(this.point, this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
