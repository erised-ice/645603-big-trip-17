import dayjs from 'dayjs';
import {datesDiff} from './utils';

const sortEventsByDate = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));

const sortEventsByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sortEventsByTime = (eventA, eventB) => {
  const time1 = datesDiff(eventA.dateFrom, eventA.dateTo);
  const time2 = datesDiff(eventB.dateFrom, eventB.dateTo);

  return time2 - time1;
};

export {sortEventsByDate, sortEventsByPrice, sortEventsByTime};
