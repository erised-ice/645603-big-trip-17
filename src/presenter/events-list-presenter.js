import {render} from '../framework/render';
import NewTripEventsListView from '../view/trip-events-list-view';
import NewEventView from '../view/event-view';
import NewEditFormView from '../view/edit-form-view';
import NoEventsView from '../view/no-events-view';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;

  #eventsListComponent = new NewTripEventsListView();
  #events = [];

  init = (eventsListContainer, eventModel) => {
    this.#eventsListContainer = eventsListContainer;
    this.#eventModel = eventModel;
    this.#events = [...this.#eventModel.events];

    if (this.#events.length === 0) {
      render(this.#eventsListComponent, this.#eventsListContainer);
      render(new NoEventsView(), this.#eventsListComponent.element);
    } else {
      render(this.#eventsListComponent, this.#eventsListContainer);

      for (let i = 0; i < this.#events.length; i++) {
        this.#renderEvents(this.#events[i]);
      }
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

    eventComponent.setArrowClickHandler(() => {
      replaceEventToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setArrowClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setSaveClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this.#eventsListComponent.element);
  };
}
