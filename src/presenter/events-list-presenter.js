import {render, RenderPosition} from '../framework/render';
import NewTripEventsListView from '../view/trip-events-list-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';
import NewSortView from '../view/sort-view';
import {generateSort} from '../mock/sort';
import {sortEventsByDate, sortEventsByTime, sortEventsByPrice} from '../utils/sort';
import {SortType} from '../const';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;
  #sorts = generateSort();

  #eventsListComponent = new NewTripEventsListView();
  #noEventsComponent = new NoEventsView();
  #eventPresenter = new Map();
  #activeSort = SortType.DAY;
  #sortComponent = new NewSortView(this.#sorts, this.#activeSort);

  constructor(eventsListContainer, eventModel) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventModel = eventModel;
  }

  get events() {
    switch (this.#activeSort) {
      case SortType.DAY:
        return [...this.#eventModel.events].sort(sortEventsByDate);
      case SortType.TIME:
        return [...this.#eventModel.events].sort(sortEventsByTime);
      case SortType.PRICE:
        return [...this.#eventModel.events].sort(sortEventsByPrice);
    }

    return this.#eventModel.events;
  }

  init = () => {
    this.#renderEvents();
    this.#renderSort();/*  */
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
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
    for (let i = 0; i < this.events.length; i++) {
      this.#renderEvent(this.events[i]);
    }
  };

  #renderEvents = () => {
    render(this.#eventsListComponent, this.#eventsListContainer);

    if (this.events.length === 0) {
      this.#renderNoEvents();
    } else {
      this.#renderEventsList();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#activeSort === sortType) {
      return;
    }

    this.#activeSort = sortType;
    this.#clearEventList();
    this.#renderEventsList();
  };

  #renderSort = () => {/* */
    render(this.#sortComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
}
