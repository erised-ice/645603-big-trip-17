import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {generateOffers} from '../mock/offers';
import {generateDestinations} from '../mock/destinations';
import {humanizeDate} from '../utils/utils';
import {TYPES} from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: '0',
  dateTo: '0',
  destination: '',
  offers: null,
  type: '',
};

const createNewEditFormViewTemplate = (data) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = data;

  const firstDate = humanizeDate(dateFrom, 'DD/MM/YYYY H:mm');
  const secondDate = humanizeDate(dateTo, 'DD/MM/YYYY H:mm');

  const offersArray = generateOffers();

  const destinationsArray = generateDestinations();
  const eventDestination = destinationsArray.find(
    (item) => item.name === data.destination);

  const createTypeEditTemplate = (currentType) => TYPES.map((eventType) => (
    `<div class="event__type-item">
      <input
        id="event-type-${eventType}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${eventType}"
        ${currentType === eventType ? 'checked' : ''}
      >
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
    </div>`)
  ).join('');

  const createDestinationsListTemplate = () => (
    destinationsArray.map((item) => `<option value="${item.name}">${item.name}</option>`).join(''));

  const createOffersTemplate = (offersData) => (
    `${offersData !== null ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersArray.find((offer) => offer.type === data.type).offers.map((item) => {

      const checked = data.offers.includes(item.id) ? 'checked' : '';

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

  const typesTemplate = createTypeEditTemplate(type);
  const destinationsList = createDestinationsListTemplate();
  const offersTemplate = createOffersTemplate(offers);
  const destinationTemplate = createDestinationTemplate(destination);

  return (`
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${typesTemplate}
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

export default class NewEditFormView extends AbstractStatefulView {
  #datepicker = null;

  constructor(event = BLANK_EVENT) {
    super();
    this._state = NewEditFormView.parseEventToState(event);

    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
  }

  get template() {
    return createNewEditFormViewTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
    this.setCloseArrowClickHandler(this._callback.arrowClick);
    this.setSaveClickHandler(this._callback.saveClick);
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: evt.target.value,
    });
  };

  setCloseArrowClickHandler = (callback) => {
    this._callback.arrowClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#arrowClickHandler);
  };

  reset = (event) => {
    this.updateElement(
      NewEditFormView.parseEventToState(event)
    );
  };

  #arrowClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.arrowClick(NewEditFormView.parseStateToEvent(this._state));
  };

  setSaveClickHandler = (callback) => {
    this._callback.saveClick = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveClickHandler);
  };

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveClick(NewEditFormView.parseStateToEvent(this._state));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDateFromDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd M H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        'time_24hr': true,
        onChange: this.#dateFromChangeHandler,
      },
    );
  };

  #setDateToDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd M H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  };

  static parseEventToState = (event) => ({...event});

  static parseStateToEvent = (state) => {
    const event = {...state};

    return event;
  };
}
