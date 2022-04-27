import NewTripEventsListView from '../view/trip-events-list-view';

import {render} from '../render.js';
import NewEditFormView from '../view/edit-form-view';
import NewEventView from '../view/event-view';

export default class EventsListPresenter {
  eventsListComponent = new NewTripEventsListView();
  editFormComponent = new NewEditFormView();

  renderEventsItem = () => render(new NewEventView(), this.eventsListComponent.getElement());

  init = (eventsListContainer) => {
    this.eventslistContainer = eventsListContainer;

    render(this.eventsListComponent, this.eventslistContainer);
    render(this.editFormComponent, this.eventsListComponent.getElement());

    Array.from({ length: 3 }, this.renderEventsItem);
  };
}
