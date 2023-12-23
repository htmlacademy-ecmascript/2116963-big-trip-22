import { FilterType } from '../const';
import { isFuture, isPast, isPresent } from './utils';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateTo)),
};

export {filter};
