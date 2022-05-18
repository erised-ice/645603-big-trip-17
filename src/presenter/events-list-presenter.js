import {render, RenderPosition} from '../framework/render';
import NewTripEventsListView from '../view/trip-events-list-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';
import {updateItem} from '../utils/common';
import NewSortView from '../view/sort-view';
import {generateSort} from '../mock/sort';
import {sortEventsByDate, sortEventsByTime, sortEventsByPrice} from '../utils/sort';
import {SortType} from '../const';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;
  #activeSort = 'day';
  #sorts = generateSort();

  #eventsListComponent = new NewTripEventsListView();
  #noEventsComponent = new NoEventsView();
  #sortComponent = new NewSortView(this.#sorts, this.#activeSort);
  #events = [];
  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(eventsListContainer, eventModel) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#events = [...this.#eventModel.events];
    this.#events.sort(sortEventsByDate);
    this.#renderEvents();
    this.#renderSort();
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

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#events.sort(sortEventsByDate);
        break;
      case SortType.TIME:
        this.#events.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this.#events.sort(sortEventsByPrice);
        break;
      default:
        this.#events.sort(sortEventsByDate);
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#clearEventList();
    this.#renderEventsList();
    this.#sortEvents(sortType);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
}
