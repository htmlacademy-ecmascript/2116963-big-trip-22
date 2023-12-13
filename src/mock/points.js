import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    'base_price': 1100,
    'date_from': '2019-03-19T00:00',
    'date_to': '2019-03-20T00:00',
    'destination': 1,
    'is_favorite': false,
    'offers': [1, 2],
    'type': 'flight'
  },
  {
    'base_price': 1100,
    'date_from': '2019-03-19T10:30',
    'date_to': '2019-03-20T11:00',
    'destination': 2,
    'is_favorite': true,
    'offers': [1],
    'type': 'taxi'
  },
  {
    'base_price': 1100,
    'date_from': '2019-03-19T12:25',
    'date_to': '2019-03-20T13:35',
    'destination': 3,
    'is_favorite': false,
    'offers': [1, 2],
    'type': 'flight'
  },
  {
    'base_price': 1100,
    'date_from': '2019-03-19T00:00',
    'date_to': '2019-03-20T00:00',
    'destination': 4,
    'is_favorite': true,
    'offers': [1],
    'type': 'drive'
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
