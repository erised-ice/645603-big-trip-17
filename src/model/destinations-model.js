import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class DestinationsModel extends Observable {
  #destinations = [];

  constructor() {
    super();
  }

  get destinations() {
    return this.#destinations;
  }

  init = (destinations) => {
    try {
      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };
}
