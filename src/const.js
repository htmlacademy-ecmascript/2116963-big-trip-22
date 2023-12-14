const TRAVEL_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DEFAULT_TYPE = 'flight';
const DATE_DIVIDER = 'T';
const TimeShorts = {
  DAY: 'D',
  HOUR: 'H',
  MINUTE: 'M',
};
const DateFormats = {
  DAY: 'DD',
  MONTH: 'MMM',
  MONTH_DAY: 'MMM DD',
  DAY_MONTH: 'DD MMM',
  TIME: 'HH:mm'
};

export { TRAVEL_TYPES, DATE_DIVIDER, TimeShorts, DEFAULT_TYPE, DateFormats };
