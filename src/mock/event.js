import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/utils';
import {nanoid} from 'nanoid';

const generateDateFrom = () => {
  const maxDayGap = 40;
  const daysGap = getRandomInteger(-maxDayGap, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const generatePrice = () => {
  const minPrice = 105;
  const maxPrice = 1050;

  return getRandomInteger(minPrice, maxPrice);
};

export const generateEvent = () => {
  const dateFrom = generateDateFrom();
  const price = generatePrice();

  return ({
    id: nanoid(),
    basePrice: price,
    dateFrom: dateFrom,
    dateTo: '2022-07-11T11:22:13.375Z',
    destination: 'Amsterdam',
    isFavorite: true,
    offers: [1,3],
    type: 'ship'
  });
};
