import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(date, template) {
  if (date) {
    return dayjs(date).format(template);
  }
}
function getDatesDifference(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dayjs(dateFrom));
}

function getDatesDuration(difference) {
  return dayjs.duration(difference);
}

function isFuture(dateFrom) {
  return dayjs().isBefore(dayjs(dateFrom));
}

function isPast(dateTo) {
  return dayjs().isAfter(dayjs(dateTo));
}

function isPresent(dateFrom, dateTo) {
  return dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));
}

export { getRandomArrayElement, formatDate, getDatesDifference, getDatesDuration, isFuture, isPast, isPresent };
