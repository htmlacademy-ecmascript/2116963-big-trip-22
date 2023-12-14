import dayjs from 'dayjs';

const DateFormats = {
  DAY: 'MMM DD',
  TIME: 'HH:mm'
};

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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
  if (date) {
    return {
      day: dayjs(date).format(DateFormats.DAY),
      time: dayjs(date).format(DateFormats.TIME)
    };
  }
}

function getDifferenceTime(dateFrom, dateTo) {
  const difference = dayjs(dateTo).diff(dayjs(dateFrom), DIfferenceUnits.MINUTE);
  const days = Math.floor(difference / TimeMinutes.DAY);
  const hours = Math.floor((difference % TimeMinutes.DAY) / TimeMinutes.HOUR);
  const minutes = Math.floor((difference % TimeMinutes.HOUR));

  return {days, hours, minutes};
}

export { getRandomArrayElement, getRandomInt, capitalizeFirstLetter, formatDate, getDifferenceTime };
