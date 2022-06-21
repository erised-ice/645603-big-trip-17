import dayjs from 'dayjs';
import {datesDiff} from './utils';

const sorts = [
  {
    value: 'day',
    name: 'Day',
    isDisabled: false
  },
  {
    value: 'event',
    name: 'Event',
    isDisabled: true
  },
  {
    value: 'time',
    name: 'Time',
    isDisabled: false
  },
  {
    value: 'price',
    name: 'Price',
    isDisabled: false
  },
  {
    value: 'offer',
    name: 'Offers',
    isDisabled: true
  }
];

const sortEventsByDate = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));

const sortEventsByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sortEventsByTime = (eventA, eventB) => {
  const time1 = datesDiff(eventA.dateFrom, eventA.dateTo);
  const time2 = datesDiff(eventB.dateFrom, eventB.dateTo);

  return time2 - time1;
};

export {sortEventsByDate, sortEventsByPrice, sortEventsByTime, sorts};
