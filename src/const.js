const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const FilterType = {
  EVERY: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESTINATIONS = ['Amsterdam', 'Barcelona', 'Naples'];

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {SortType, FilterType, TYPES, DESTINATIONS, UserAction, UpdateType};
