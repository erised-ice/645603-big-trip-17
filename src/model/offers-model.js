import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
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
