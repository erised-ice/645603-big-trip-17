import Observable from '../framework/observable';
import {generateEvent} from '../mock/event';

export default class EventModel extends Observable {
  #events = Array.from({length: 10}, generateEvent);

  get events() {
    return this.#events;
  }
}
