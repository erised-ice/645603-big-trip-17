import NewTripEventsListView from '../view/trip-events-list-view';

import {render} from '../render.js';
import NewEditFormView from '../view/edit-form-view';
import NewEventView from '../view/event-view';

export default class EventsListPresenter {
  eventsListComponent = new NewTripEventsListView();

  init = (eventsListContainer, eventModel) => {
    this.eventslistContainer = eventsListContainer;
    this.eventModel = eventModel;
    this.events = [...this.eventModel.getEvents()];

    render(this.eventsListComponent, this.eventslistContainer);
    render(new NewEditFormView(this.events[0]), this.eventsListComponent.getElement());

    for (let i = 1; i < this.events.length; i++) {
      render(new NewEventView(this.events[i]), this.eventsListComponent.getElement());
    }
  };
}
