import AbstractView from '../framework/view/abstract-view.js';

const createNewTripEventsListViewTemplate = () => '<ul class="trip-events__list"></ul>';

export default class NewTripEventsListView extends AbstractView {
  get template() {
    return createNewTripEventsListViewTemplate();
  }
}
