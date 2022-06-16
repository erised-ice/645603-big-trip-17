import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizeDate} from '../utils/utils';
import {TYPES} from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  basePrice: 1,
  dateFrom: '0',
  dateTo: '0',
  destination: {
    name: ''
  },
  offers: [],
  type: 'bus',
  isFavorite: false
};

const createNewEditFormViewTemplate = (data, isAddForm, offersDataArray, destinationsArray) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    type,
    isDisabled,
    isSaving,
    isDeleting,
  } = data;

  const firstDate = humanizeDate(dateFrom, 'DD/MM/YYYY H:mm');
  const secondDate = humanizeDate(dateTo, 'DD/MM/YYYY H:mm');

  const eventOffer = offersDataArray.find(
    (item) => item.type === data.type);

  const eventDestination = destinationsArray.find(
    (item) => item.name === data.destination.name);

  const createTypeEditTemplate = (currentType, isDisabledElement) => TYPES.map((eventType) => (
    `<div class="event__type-item">
      <input
        id="event-type-${eventType}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${eventType}"
        ${currentType === eventType ? 'checked' : ''}
        ${isDisabledElement ? 'disabled' : ''}
      >
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
    </div>`)
  ).join('');

  const createDestinationsListTemplate = () => (
    destinationsArray.map((item) => `<option value="${item.name}">${item.name}</option>`).join(''));

  const createOffersTemplate = (offersData, isDisabledElement) => (
    `${eventOffer.offers.length > 0 ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersDataArray.find((offer) => offer.type === data.type).offers.map((item) => {

      const checked = data.offers.includes(item.id) ? 'checked' : '';

      return `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="event-offer-meal-${item.id}"
            type="checkbox" name="event-offer-meal"
            ${checked}
            value="${item.id}"
            ${isDisabledElement ? 'disabled' : ''}
          >
          <label class="event__offer-label" for="event-offer-meal-${item.id}">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </label>
        </div>`;
    }).join('')}
      </div>
    </section>` : ''}`
  );

  const createDestinationTemplate = (destinationData) => {
    const hasDestination = destinationsArray.some((item) => item.name.toLowerCase() === destinationData.toLowerCase());

    return hasDestination ? (
      `${destinationData !== '' ?
        `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${eventDestination.description}</p>
          ${eventDestination.pictures.length > 0 ? (
        `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${eventDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
            </div>
          </div>`
      ) : ''}
        </section>` : ''}`
    ) : '';
  };

  const typesTemplate = createTypeEditTemplate(type, isDisabled);
  const destinationsList = createDestinationsListTemplate();
  const offersTemplate = createOffersTemplate(offers, isDisabled);
  const destinationTemplate = createDestinationTemplate(destination.name);
  const deleteText = isDeleting ? 'deleting...' : 'delete';

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" required>
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
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
      </div>

      <button
        class="event__save-btn btn btn--blue"
        type="submit"
        ${isDisabled ? 'disabled' : ''}
      >
        ${isSaving ? 'saving...' : 'save'}
      </button>
      <button
        class="event__reset-btn${isAddForm ? ' cansel-btn' : ''}"
        type="reset"
        ${isDisabled ? 'disabled' : ''}
      >
        ${isAddForm ? 'Cancel' : deleteText}
      </button>
      ${!isAddForm ? (`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    ) : ''}
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
  #offers = [];
  #destinations = [];

  constructor({event: event = BLANK_EVENT, isAddForm: isAddForm = false}, offers, destinations) {
    super();
    this._state = NewEditFormView.parseEventToState(event);
    this.isAddForm = isAddForm;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
  }

  get template() {
    return createNewEditFormViewTemplate(this._state, this.isAddForm, this.#offers, this.#destinations);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  setDeleteClickHandler = (callback) => {
    if (!this.isAddForm) {
      this._callback.deleteClick = callback;
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    }
  };

  setCancelClickHandler = (callback) => {
    if (this.isAddForm) {
      this._callback.cancelClick = callback;

      this.element.querySelector('.cansel-btn').addEventListener('click', this.#formCancelClickHandler);
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
    this.setCloseArrowClickHandler(this._callback.arrowClick);
    this.setSaveClickHandler(this._callback.saveClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setCancelClickHandler(this._callback.cancelClick);
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const updatedDestination = this.#destinations.find(
      (item) => item.name === evt.target.value);
    this._state.destinationName = evt.target.value;

    if (updatedDestination) {
      this.updateElement({
        destination: updatedDestination
      });
    }
  };

  setCloseArrowClickHandler = (callback) => {
    if (!this.isAddForm) {
      this._callback.arrowClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#arrowClickHandler);
    }
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
    const hasDestination = this.#destinations.some((item) => item.name.toLowerCase() === this._state.destinationName.toLowerCase());

    if (hasDestination) {
      this._callback.saveClick(NewEditFormView.parseStateToEvent(this._state));
      return;
    }

    this.shake();
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
        dateFormat: 'd/m/Y H:i',
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
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  #offersChangeHandler = (evt) => {
    const value = Number(evt.target.value);

    if (this._state.offers.includes(value)) {
      this._state.offers = this._state.offers.filter((id) => id !== value);
    } else {
      this._state.offers.push(value);
    }

    this.updateElement({
      offers: this._state.offers
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    if(this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    }
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(NewEditFormView.parseStateToEvent(this._state));
  };

  #formCancelClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cancelClick(NewEditFormView.parseStateToEvent(this._state));
  };

  static parseEventToState = (event) => ({...event,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
    destinationName: event.destination.name
  });

  static parseStateToEvent = (state) => {
    const event = {...state};

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;
    delete event.destinationName;

    return event;
  };
}
