import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/utils';
import {nanoid} from 'nanoid';

const generateDateFrom = () => {
  const maxDayGap = 40;
  const daysGap = getRandomInteger(-maxDayGap, maxDayGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateDateTo = () => {
  const maxDayGap = 10;
  const daysGap = getRandomInteger(-maxDayGap, maxDayGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const generatePrice = () => {
  const minPrice = 105;
  const maxPrice = 1050;

  return getRandomInteger(minPrice, maxPrice);
};

export const generateEvent = () => {
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo();
  const price = generatePrice();

  return ({
    id: nanoid(),
    basePrice: price,
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: 'Amsterdam',
    isFavorite: true,
    offers: [1,3],
    type: 'ship'
  });
};
