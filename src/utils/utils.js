import dayjs from 'dayjs';

const humanizeDate = (date, format) => dayjs(date).format(format);
const datesDiff = (date1, date2) => dayjs(date2).diff(dayjs(date1), 's');

const setDurationFormat = (numberInSeconds) => {
  const min = numberInSeconds / 60;

  const hour = min / 60;

  return `${Math.floor(hour / 24)}D ${Math.floor(hour % 24)}H ${Math.floor(min % 60)}M`;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export {humanizeDate, datesDiff, setDurationFormat, getRandomInteger};
