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

export function isFuture(dateFrom) {
  return dayjs().isBefore(dayjs(dateFrom));
}

export function isPast(dateTo) {
  return dayjs().isAfter(dayjs(dateTo));
}

export function isPresent(dateFrom, dateTo) {
  return dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));
}

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}
