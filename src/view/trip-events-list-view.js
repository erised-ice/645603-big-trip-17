import {createElement} from '../render';

const createNewTripEventsListViewTemplate = () => '<ul class="trip-events__list"></ul>';

export default class NewTripEventsListView {
  #element = null;

  get template() {
    return createNewTripEventsListViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
