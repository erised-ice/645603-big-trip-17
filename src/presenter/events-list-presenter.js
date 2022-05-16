import {render} from '../framework/render';
import NewTripEventsListView from '../view/trip-events-list-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';
import {updateItem} from '../utils/common';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;

  #eventsListComponent = new NewTripEventsListView();
  #noEventsComponent = new NoEventsView();
  #events = [];
  #eventPresenter = new Map();

  constructor(eventsListContainer, eventModel) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#events = [...this.#eventModel.events];

    this.#renderEvents();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent.element, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  };

  #renderNoEvents = () => {
    render(this.#noEventsComponent, this.#eventsListComponent.element);
  };

  #clearEventList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };

  #renderEventsList = () => {
    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i]);
    }
  };

  #renderEvents = () => {
    render(this.#eventsListComponent, this.#eventsListContainer);

    if (this.#events.length === 0) {
      this.#renderNoEvents();
    } else {
      this.#renderEventsList();
    }
  };
}
