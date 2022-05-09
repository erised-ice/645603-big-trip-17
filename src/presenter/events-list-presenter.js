import NewTripEventsListView from '../view/trip-events-list-view';

import {render} from '../render.js';
import NewEventView from '../view/event-view';
import NewEditFormView from '../view/edit-form-view';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;

  #eventsListComponent = new NewTripEventsListView();
  #events = [];

  init = (eventsListContainer, eventModel) => {
    this.#eventsListContainer = eventsListContainer;
    this.#eventModel = eventModel;
    this.#events = [...this.#eventModel.events];

    render(this.#eventsListComponent, this.#eventsListContainer);

    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvents(this.#events[i]);
    }
  };

  #renderEvents = (event) => {
    const eventComponent = new NewEventView(event);
    const editFormComponent = new NewEditFormView(event);

    const replaceEventToForm = () => {
      this.#eventsListComponent.element.replaceChild(editFormComponent.element, eventComponent.element);
    };

    const replaceFormToEvent = () => {
      this.#eventsListComponent.element.replaceChild(eventComponent.element, editFormComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.element.querySelector('.event__save-btn').addEventListener('click', () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this.#eventsListComponent.element);
  };
}
