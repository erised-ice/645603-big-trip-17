import {createElement} from '../render.js';

const createNewTestViewTemplate = () => '<button class="apple">Test</button>';

export default class NewTestView {
  getTemplate() {
    return createNewTestViewTemplate();
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
