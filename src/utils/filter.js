import {FilterType} from '../const';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERY]: (events) => events,
  [FilterType.PAST]: (events) => events.filter((event) => dayjs().isAfter(event.dateTo) || dayjs().isAfter(event.dateFrom) && dayjs().isBefore(event.dateTo)),
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs().isSame(event.dateFrom) || dayjs().isBefore(event.dateFrom) || dayjs().isAfter(event.dateFrom) && dayjs().isBefore(event.dateTo))
};

export {filter};
