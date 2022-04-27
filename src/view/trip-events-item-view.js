import {createElement} from "../render";

const createNewTripEventsItemViewTemplate = () => `<li class="trip-events__item"></li>`;

export default class NewTripEventsItemView {
  getTemplate() {
    return createNewTripEventsItemViewTemplate();
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
