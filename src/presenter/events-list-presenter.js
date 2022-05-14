import {render} from '../framework/render';
import NewTripEventsListView from '../view/trip-events-list-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;

  #eventsListComponent = new NewTripEventsListView();
  #noEventsComponent = new NoEventsView();
  #events = [];

  constructor(eventsListContainer, eventModel) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#events = [...this.#eventModel.events];

    this.#renderEvents();
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent.element);
    eventPresenter.init(event);
  };

  #renderNoEvents = () => {
    render(this.#noEventsComponent, this.#eventsListComponent.element);
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
