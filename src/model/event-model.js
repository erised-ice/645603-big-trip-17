import {generateEvent} from '../mock/event';

export default class EventModel {
  #events = Array.from({length: 10}, generateEvent);

  get events() {
    return this.#events;
  }
}
