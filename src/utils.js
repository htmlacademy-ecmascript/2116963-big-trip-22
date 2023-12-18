import dayjs from 'dayjs';

const DIfferenceUnits = {
  MINUTE: 'minute',
};

const TimeMinutes = {
  DAY: 1440,
  HOUR: 60
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(date, template) {
  if (date) {
    return dayjs(date).format(template);
  }
}

function getDifferenceTime(dateFrom, dateTo) {
  const difference = dayjs(dateTo).diff(dayjs(dateFrom), DIfferenceUnits.MINUTE);
  const days = Math.floor(difference / TimeMinutes.DAY);
  const hours = Math.floor((difference % TimeMinutes.DAY) / TimeMinutes.HOUR);
  const minutes = Math.floor((difference % TimeMinutes.HOUR));

  return {days, hours, minutes};
}

export { getRandomArrayElement, formatDate, getDifferenceTime };
