import {createElement} from "../render";

const createNewTripEventsListViewTemplate = () => `<ul class="trip-events__list"></ul>`;

export default class NewTripEventsListView {
  getTemplate() {
    return createNewTripEventsListViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
