import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(date, template) {
  if (date) {
    return dayjs(date).format(template);
  }
}

export { getRandomArrayElement, formatDate };
