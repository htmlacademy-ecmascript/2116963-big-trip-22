import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function formatDate(date, template) {
  if (date) {
    return dayjs(date).format(template);
  }
}
export function getDatesDifference(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dayjs(dateFrom));
}

export function getDatesDuration(difference) {
  return dayjs.duration(difference);
}

export function isDatesEqual(dateA, dateB) {
  return dayjs(dateA).isSame(dateB);
}

export function isFuture(dateFrom) {
  return dayjs().isBefore(dayjs(dateFrom));
}

export function isPast(dateTo) {
  return dayjs().isAfter(dayjs(dateTo));
}

export function isPresent(dateFrom, dateTo) {
  return dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));
}

export function sortPointsDay(pointA, pointB) {
  return getDatesDifference(pointB.dateFrom, pointA.dateFrom);
}

export function sortPointsTime(pointA, pointB) {
  return getDatesDifference(pointB.dateFrom, pointB.dateTo) - getDatesDifference(pointA.dateFrom, pointA.dateTo);
}

export function sortPointsPrice(pointA, pointB) {
  return pointB['basePrice'] - pointA['basePrice'];
}
