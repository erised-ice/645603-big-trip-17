import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #offers = [];

  constructor() {
    super();
  }

  get offers() {
    return this.#offers;
  }

  init = (offers) => {
    try {
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }
  };
}
