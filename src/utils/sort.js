import { SortType } from '../const';
import { getDatesDifference } from './utils';

const sort = {
  [SortType.DAY]: (points) => points,
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => [...points]
    .sort((point, comparison) => getDatesDifference(point.dateFrom, point.dateTo) - getDatesDifference(comparison.dateFrom, comparison.dateTo)),
  [SortType.PRICE]: (points) => [...points].sort((point, comparison) => comparison.basePrise - point.basePrise),
  [SortType.OFFER]: (points) => points,
};

export { sort };
