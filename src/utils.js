import dayjs from 'dayjs';

const humanizeDate = (date, format) => dayjs(date).format(format);

const setDurationFormat = (numberInMinutes) => {
  const hour = 60;
  const day = 24 * hour;

  if (numberInMinutes < hour) {
    return `${Math.floor(numberInMinutes)}M`;
  } else if (numberInMinutes >= hour && numberInMinutes < day) {
    return `${Math.floor(numberInMinutes / hour)}H ${Math.floor(numberInMinutes % hour)}M`;
  } else {
    return `${Math.floor(numberInMinutes / day)}D ${Math.floor((numberInMinutes % day) / hour)}H ${Math.floor(Math.floor((numberInMinutes % day) % hour))}M`;
  }
};

export {humanizeDate, setDurationFormat};
