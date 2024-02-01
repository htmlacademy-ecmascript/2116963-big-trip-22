import { formatDate, getDatesDifference, getDatesDuration, getDifferenceTime } from '../utils/utils';
import { DateFormats, DIfferenceUnits, MinutesIn, TimeSigns } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createOffersTemplate(pointOffers, checkedOffers) {
  return pointOffers.filter((offer) => checkedOffers.includes(offer.id))
    .map((offer) => (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
    ))
    .join('');
}

function createTimeUnitTemplate(time, sign) {
  const zeroTime = time < 10 ? `0${time}` : time.toString();
  return `${zeroTime + sign} `;
}

function createDifferenceTimeTemplate(dateFrom, dateTo) {
  // const difference = getDatesDifference(dateFrom, dateTo);
  // const duration = getDatesDuration(difference);
  // const format = (differenceDuration.days() > 0 ? `${DateFormats.DAYS} ` : '')
  //   + (differenceDuration.hours() > 0 ? `${DateFormats.HOURS} ` : '')
  //   + DateFormats.MINUTES;
  // const format = (differenceDuration.hours() > 0 ? `${DateFormats.HOURS} ` : '')
  //   + DateFormats.MINUTES;
  // return duration.format(format);
  const { days, hours, minutes } = getDifferenceTime(dateFrom, dateTo);
  const daysTemplate = createTimeUnitTemplate(days, TimeSigns.DAY);
  const hoursTemplate = createTimeUnitTemplate(hours, TimeSigns.HOUR);
  const minutesTemplate = createTimeUnitTemplate(minutes, TimeSigns.MINUTE);
  if (days > 0) {
    return daysTemplate + hoursTemplate + minutesTemplate;
  } else if (hours > 0) {
    return hoursTemplate + minutesTemplate;
  } else {
    return minutesTemplate;
  }
}

function createPointTemplate(point, offers, destinations) {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers: checkedOffers, type } = point;
  const pointOffers = [...offers.find((offer) => offer.type === type).offers];
  const pointDestination = destinations.find((item) => destination === item.id);
  const activeClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${formatDate(dateFrom, DateFormats.MONTH_DAY)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination ? pointDestination.name : ''}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${formatDate(dateFrom, DateFormats.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${formatDate(dateTo, DateFormats.TIME)}</time>
          </p>
          <p class="event__duration">${createDifferenceTimeTemplate(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${checkedOffers.length ? createOffersTemplate(pointOffers, checkedOffers) : ''}
        </ul>
        <button class="event__favorite-btn  ${activeClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = [];
  #offers = [];
  #destinations = [];
  #handleArrowClick = null;
  #handleFavoriteClick = null;

  constructor({ point, offers, destinations, handleArrowClick, handleFavoriteClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleArrowClick = handleArrowClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onArrowClick);
    this.#handleFavoriteClick = handleFavoriteClick;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteClick);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #onArrowClick = (evt) => {
    evt.preventDefault();
    this.#handleArrowClick();
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
