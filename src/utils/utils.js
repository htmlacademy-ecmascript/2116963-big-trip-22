import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(date, template) {
  if (date) {
    return dayjs(date).format(template);
  }
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

export { getRandomArrayElement, formatDate, isFuture, isPast, isPresent };
