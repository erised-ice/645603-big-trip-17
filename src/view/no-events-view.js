import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const';

const NoEventsTestType = {
  [FilterType.EVERY]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createNoEventTemplate = (filterType) => {
  const noEventTextValue = NoEventsTestType[filterType];

  return (
    `<p class="trip-events__msg">${noEventTextValue}</p>`
  );
};

export default class NoEventsView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}
