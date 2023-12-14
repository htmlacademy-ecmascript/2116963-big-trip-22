import { createElement } from '../render';
import { capitalizeFirstLetter, formatDate, getDifferenceTime } from '../utils';
import { DATE_DIVIDER, TimeShorts } from '../const';

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

function createTimeUnitTemplate(time, short) {
  const addedZeroTime = time < 10 ? `0${time}` : time.toString();
  return `${addedZeroTime + short} `;
}

function createDifferenceTimeTemplate(dateFrom, dateTo) {
  const {days, hours, minutes} = getDifferenceTime(dateFrom, dateTo);
  const daysTemplate = createTimeUnitTemplate(days, TimeShorts.DAY);
  const hoursTemplate = createTimeUnitTemplate(hours, TimeShorts.HOUR);
  const minutesTemplate = createTimeUnitTemplate(minutes, TimeShorts.MINUTE);
  if (days > 0) {
    return daysTemplate + hoursTemplate + minutesTemplate;
  } else if (hours > 0) {
    return hoursTemplate + minutesTemplate;
  } else {
    return minutesTemplate;
  }
}

function createPointTemplate(point, pointOffers, pointDestination) {
  const { basePrice, dateFrom, dateTo, isFavorite, offers: checkedOffers, type } = point;
  const formattedDate = {
    from: formatDate(dateFrom),
    to: formatDate(dateTo),
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom.substring(0, dateFrom.indexOf(DATE_DIVIDER))}">${formattedDate.from.day}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(type)} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${formattedDate.from.time}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${formattedDate.to.time}</time>
          </p>
          <p class="event__duration">${createDifferenceTimeTemplate(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(pointOffers, checkedOffers)}
        </ul>
        <button class="event__favorite-btn  ${isFavorite && 'event__favorite-btn--active'}" type="button">
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

export default class PointView {
  constructor({ point, pointOffers, pointDestination }) {
    this.point = point;
    this.pointOffers = pointOffers;
    this.pointDestination = pointDestination;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.pointOffers, this.pointDestination);
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
