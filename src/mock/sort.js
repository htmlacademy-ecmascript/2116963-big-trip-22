import { sort } from '../utils/sort';

function generateSort(points) {
  return Object.entries(sort).map(
    ([sortType, sortPoints]) => ({
      type: sortType,
      sortPoints: sortPoints(points),
    }),
  );
}

export {generateSort};
