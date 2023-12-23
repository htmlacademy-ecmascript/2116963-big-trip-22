const mockPoints = [
  {
    'id': 1,
    'basePrice': 200,
    'dateFrom': '2019-03-19T00:00',
    'dateTo': '2019-03-20T01:00',
    'destination': 1,
    'isFavorite': false,
    'offers': [1, 2, 3],
    'type': 'flight'
  },
  {
    'id': 2,
    'basePrice': 100,
    'dateFrom': '2019-03-20T10:30',
    'dateTo': '2019-03-20T11:00',
    'destination': 2,
    'isFavorite': true,
    'offers': [1],
    'type': 'taxi'
  },
  {
    'id': 3,
    'basePrice': 400,
    'dateFrom': '2019-03-20T16:25',
    'dateTo': '2019-03-22T10:35',
    'destination': 2,
    'isFavorite': false,
    'offers': [1, 2],
    'type': 'sightseeing'
  },
  {
    'id': 4,
    'basePrice': 300,
    'dateFrom': '2019-03-22T12:00',
    'dateTo': '2019-03-22T22:00',
    'destination': 3,
    'isFavorite': true,
    'offers': [1],
    'type': 'drive'
  },
];

export { mockPoints };
