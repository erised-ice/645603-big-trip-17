import NewTripEventsListView from "../view/trip-events-list-view";

import {render} from "../render.js";
import NewTripEventsItemView from "../view/trip-events-item-view";
import NewEditFormView from "../view/edit-form-view";
import NewEventView from "../view/event-view";

export default class EventsListPresenter {
  eventsListComponent = new NewTripEventsListView();
  eventsItemComponent = new NewTripEventsItemView();
  editFormComponent = new NewEditFormView();

  renderEventsItem = () => {
    const item = new NewTripEventsItemView();
    render(item, this.eventsListComponent.getElement());
    render(new NewEventView(), item.getElement());
  }

  init = (eventsListContainer) => {
    this.eventslistContainer = eventsListContainer;

    render(this.eventsListComponent, this.eventslistContainer);
    render(this.eventsItemComponent, this.eventsListComponent.getElement());
    render(this.editFormComponent, this.eventsItemComponent.getElement());

    Array.from({ length: 3 }, this.renderEventsItem);
  }
}
