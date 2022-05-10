import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, setDurationFormat} from '../utils';
import {generateOffers} from '../mock/offers';

const createNewEventViewTemplate = (event) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type, isFavorite} = event;

  const date = humanizeDate(dateFrom, 'MMM D');
  const firstDate = humanizeDate(dateFrom, 'H:mm');
  const secondDate = humanizeDate(dateTo, 'H:mm');

  const eventDuration = setDurationFormat(1580.80);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  const offersArray = generateOffers();

  const eventTypeOffers = offersArray.find((offer) => offer.type === event.type);

  const eventOffers = eventTypeOffers.offers.filter((item) => offers.includes(item.id));

  const createOffersTemplate = (offersData) => (
    `<ul class="event__selected-offers">
       ${offersData.map((item) => `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>`).join('')}
    </ul>`
  );

  const offersTemplate = createOffersTemplate(eventOffers);

  return (`
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${firstDate}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${secondDate}</time>
      </p>
      <p class="event__duration">${eventDuration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${offersTemplate}
    <button class="${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`);
};

export default class NewEventView extends AbstractView {
  constructor(event) {
    super();
    this.event = event;
  }

  get template() {
    return createNewEventViewTemplate(this.event);
  }

  setArrowClickHandler = (callback) => {
    this._callback.arrowClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#arrowClickHandler);
  };

  #arrowClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.arrowClick();
  };
}
