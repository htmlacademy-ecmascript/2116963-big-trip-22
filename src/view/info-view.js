import AbstractView from '../framework/view/abstract-view';
import { sortPointsDay, formatDate, sumNumbers } from '../utils/utils';
import { DateFormats } from '../const';

const ROUTE_LIMIT = 3;

function createRouteTemplate(points, destinations) {
  const idRoute = points.map((point) => point.destination);
  const cities = idRoute.map((id) => destinations.find((item) => item.id === id).name);
  let routeTemplate = '';
  if (cities.length <= ROUTE_LIMIT) {
    cities.forEach((city, index) => {
      routeTemplate += `${city}`;
      if (index < cities.length - 1) {
        routeTemplate += ' &mdash; ';
      }
    });
  } else {
    routeTemplate = `${cities[0]} &mdash;...&mdash; ${cities[cities.length - 1]}`;
  }
  return routeTemplate;
}

function createPeriodTemplate(points) {
  const dateStart = points[0].dateFrom;
  const dateFinish = points[points.length - 1].dateTo;
  // if (dateStart === dateFinish || points.length === 1) {
  //   return formatDate(dateFinish, DateFormats.DAY_MONTH);
  // }
  // const monthStart = formatDate(dateStart, DateFormats.MONTH);
  // const monthFinish = formatDate(dateFinish, DateFormats.MONTH);
  const start = formatDate(dateStart, DateFormats.DAY_MONTH);
  const finish = formatDate(dateFinish, DateFormats.DAY_MONTH);
  if (start === finish) {
    return start;
  }
  return `${start}&nbsp;&mdash;&nbsp;${finish}`;
}

function getSumPrice(points, offers) {
  const basePrices = points.map((point) => point.basePrice);
  const offerPrices = points.map((point) => {
    const pointOffers = offers.find((offer) => offer.type === point.type).offers;
    const checkedOffers = point.offers;
    const checkedOffersPrice = checkedOffers.map((checkedOffer) => pointOffers.find((offer) => offer.id === checkedOffer).price);
    return checkedOffersPrice.length ? sumNumbers(checkedOffersPrice) : 0;
  });
  const prices = [...basePrices, ...offerPrices];
  return prices.reduce((accumulator, currentValue) => accumulator + currentValue);
}

function createInfoTemplate(points, offers, destinations) {
  // const period = getPeriodDates(points);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${points.length ? createRouteTemplate(points, destinations) : ''}</h1>

        <p class="trip-info__dates">${points.length ? createPeriodTemplate(points) : ''}</p>
      </div>

      <p class="trip-info__cost">
        ${points.length ? `Total: &euro;&nbsp;<span class="trip-info__cost-value">${getSumPrice(points, offers)}</span>` : ''}
      </p>
    </section>`
  );
}

export default class InfoView extends AbstractView {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({ points, offers, destinations }) {
    super();
    this.#points = [...points].sort(sortPointsDay);
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#offers, this.#destinations);
  }
}
