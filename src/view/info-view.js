import { createElement } from '../render';
import { formatDate } from '../utils';
import { DateFormats } from '../const';

const ROUTE_LIMIT = 3;

function createRouteTemplate(points, destinations) {
  const idRoute = [...new Set(points.map((point) => point.destination))];
  const cities = idRoute.map((id) => destinations.find((item) => item.id === id).name);
  let routeTemplate = '';
  if (cities.length <= ROUTE_LIMIT) {
    cities.forEach((city, index) => {
      routeTemplate += index < cities.length - 1 ? `${city} &mdash; ` : `${city}`;
    });
  } else {
    routeTemplate = `${cities[0]} &mdash;...&mdash; ${cities[cities.length - 1]}`;
  }
  return routeTemplate;
}

function getPeriodDates(points) {
  const dateStart = points[0].dateFrom;
  const dateFinish = points[points.length - 1].dateTo;
  const monthStart = formatDate(dateStart, DateFormats.MONTH);
  const monthFinish = formatDate(dateFinish, DateFormats.MONTH);
  const start = monthStart === monthFinish ? formatDate(dateStart, DateFormats.DAY) : formatDate(dateStart, DateFormats.DAY_MONTH);
  const finish = formatDate(points[points.length - 1].dateTo, DateFormats.DAY_MONTH);
  return { start, finish };
}

function getSumPrice(points) {
  const prices = points.map((point) => point.basePrice);
  return prices.reduce((partialSum, a) => partialSum + a, 0);
}

function createInfoTemplate(points, destinations) {
  const period = getPeriodDates(points);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createRouteTemplate(points, destinations)}</h1>

        <p class="trip-info__dates">${period.start}&nbsp;&mdash;&nbsp;${period.finish}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getSumPrice(points)}</span>
      </p>
    </section>`
  );
}

export default class InfoView {
  constructor({ points, destinations }) {
    this.points = points;
    this.destinations = destinations;
  }

  getTemplate() {
    return createInfoTemplate(this.points, this.destinations);
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
