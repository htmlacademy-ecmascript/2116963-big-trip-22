import dayjs from 'dayjs';
import { MinutesIn, DIfferenceUnits } from '../const';


export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function sumNumbers(numbers) {
  return numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
}

export function formatDate(date, template) {
  if (date) {
    return dayjs(date).format(template);
  }
}

export function getDatesDifference(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dayjs(dateFrom));
}

export function getDifferenceTime(dateFrom, dateTo) {
  const difference = dayjs(dateTo).diff(dayjs(dateFrom), DIfferenceUnits.MINUTE);
  const days = Math.floor(difference / MinutesIn.DAY);
  const hours = Math.floor((difference % MinutesIn.DAY) / MinutesIn.HOUR);
  const minutes = Math.floor(difference % MinutesIn.HOUR);
  return {days, hours, minutes};
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
