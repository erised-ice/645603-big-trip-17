import dayjs from 'dayjs';
import {datesDiff} from './utils';

const sortEventsByDate = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));

const sortEventsByPrice = (eventA, eventB) => eventA.basePrice - eventB.basePrice;

const sortEventsByTime = (eventA, eventB) => {
  const time1 = datesDiff(eventA.dateFrom, eventA.dateTo);
  const time2 = datesDiff(eventB.dateFrom, eventB.dateTo);

  return time1 - time2;
};

export {sortEventsByDate, sortEventsByPrice, sortEventsByTime};
