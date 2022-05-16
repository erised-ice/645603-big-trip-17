import AbstractView from '../framework/view/abstract-view.js';
import {generateOffers} from '../mock/offers';
import {generateDestinations} from '../mock/destinations';
import {humanizeDate} from '../utils/utils';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: '0',
  dateTo: '0',
  destination: '',
  offers: null,
  type: '',
};

const createNewEditFormViewTemplate = (event = {}) => {
  const {
    basePrice = '',
    dateFrom = '0',
    dateTo = '0',
    destination = '',
    offers = null,
    type = ''
  } = event;

  const firstDate = humanizeDate(dateFrom, 'DD/MM/YYYY H:mm');
  const secondDate = humanizeDate(dateTo, 'DD/MM/YYYY H:mm');

  const offersArray = generateOffers();

  const createOffersTemplate = (offersData) => (
    `${offersData !== null ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersArray.find((offer) => offer.type === event.type).offers.map((item) => {

      const checked = event.offers.includes(item.id) ? 'checked' : '';

      return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal" ${checked}>
          <label class="event__offer-label" for="event-offer-meal-1">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </label>
        </div>`;
    }).join('')}
      </div>
    </section>` : ''}`
  );

  const destinationsArray = generateDestinations();
  const eventDestination = destinationsArray.find(
    (item) => item.name === event.destination);

  const createDestinationTemplate = (destinationData) => (
    `${destinationData !== '' ?
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${eventDestination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${eventDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
          </div>
        </div>
      </section>` : '' }`
  );

  const createDestinationsListTemplate = () => (
    destinationsArray.map((item) => `<option value="${item.name}"></option>`).join(''));

  const destinationsList = createDestinationsListTemplate();
  const destinationTemplate = createDestinationTemplate(destination);
  const offersTemplate = createOffersTemplate(offers);

  return (`
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          ${type && '<img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">'}
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationsList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${firstDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${secondDate}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${offersTemplate}
    ${destinationTemplate}
  </section>
  </form>
</li>
`);
};

export default class NewEditFormView extends AbstractView {
  #event = null;

  constructor(event = BLANK_EVENT) {
    super();
    this.#event = event;
  }

  get template() {
    return createNewEditFormViewTemplate(this.#event);
  }

  setCloseArrowClickHandler = (callback) => {
    this._callback.arrowClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#arrowClickHandler);
  };

  #arrowClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.arrowClick(this.#event);
  };

  setSaveClickHandler = (callback) => {
    this._callback.saveClick = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveClickHandler);
  };

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveClick(this.#event);
  };
}
