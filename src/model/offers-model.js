import Observable from '../framework/observable';
import {UpdateType} from '../const';

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

    //this._notify(UpdateType.INIT);
  };
}
