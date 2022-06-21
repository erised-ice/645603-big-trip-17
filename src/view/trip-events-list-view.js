import AbstractView from '../framework/view/abstract-view.js';

const createTripEventsListViewTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsListView extends AbstractView {
  get template() {
    return createTripEventsListViewTemplate();
  }
}
