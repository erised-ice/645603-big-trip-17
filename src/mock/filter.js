import dayjs from 'dayjs';

export const generateFilter = (events) => {
  const pastEvents = events.filter((event) => dayjs().isAfter(event.dateTo));
  const futureEvents = events.filter((event) => dayjs().isSame(event.dateFrom) || dayjs().isBefore(event.dateFrom));

  return ([
    {
      value: 'everything',
      name: 'Everything',
      isDisable: events.length <= 0
    },
    {
      value: 'future',
      name: 'Future',
      isDisable: futureEvents.length <= 0
    },
    {
      value: 'past',
      name: 'Past',
      isDisable: pastEvents.length <= 0
    }
  ]);
};
