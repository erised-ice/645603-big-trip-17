import dayjs from 'dayjs';

const humanizeDate = (date, format) => dayjs(date).format(format);
const datesDiff = (date1, date2) => dayjs(date2).diff(dayjs(date1), 's');

const setDurationFormat = (numberInSeconds) => {
  const min = numberInSeconds / 60;
  const hour = min / 60;

  const days = Math.floor(hour / 24);
  const hours = Math.floor(hour % 24);
  const minutes = Math.floor(min % 60);

  const formatNumber = (time) => time >= 10 ? time : `0${time}`;

  return `${days !== 0 ? `${formatNumber(days)}D ` : ''}${days === 0 && hours === 0 ? '' : `${formatNumber(hours)}H `}${days === 0 && hours === 0 && minutes === 0 ? '' : `${formatNumber(minutes)}M `}`;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export {humanizeDate, datesDiff, setDurationFormat, getRandomInteger};
