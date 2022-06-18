import AbstractView from '../framework/view/abstract-view';
import {humanizeDate} from '../utils/utils';

const createTripInfoTemplate = (tripInfo) => {
  const {destinations, dateFrom, dateTo, totalPrice} = tripInfo;

  const createDestinationsTemplate = (cityNames) => {
    if (cityNames.length > 3) {
      return `${cityNames[0]} &mdash; ... &mdash; ${cityNames[cityNames.length - 1]}`;
    }

    return `${cityNames[0]} &mdash; ${cityNames[1]} &mdash; ${cityNames[2]}`;
  };

  const startDate = humanizeDate(dateFrom, 'D MMM');
  const finishDate = humanizeDate(dateTo, 'D MMM');

  const destinationsTemplate = createDestinationsTemplate(destinations);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinationsTemplate}</h1>

        <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${finishDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #currentTripInfo = null;

  constructor(currentTripInfo) {
    super();
    this.#currentTripInfo = currentTripInfo;
  }

  get template() {
    return createTripInfoTemplate(this.#currentTripInfo);
  }
}
