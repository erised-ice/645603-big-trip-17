import {remove, render, RenderPosition} from '../framework/render';
import NewTripEventsListView from '../view/trip-events-list-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';
import NewSortView from '../view/sort-view';
import {generateSort} from '../mock/sort';
import {sortEventsByDate, sortEventsByTime, sortEventsByPrice} from '../utils/sort';
import {SortType, UpdateType, UserAction} from '../const';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;
  #sorts = generateSort();

  #eventsListComponent = new NewTripEventsListView();
  #noEventsComponent = new NoEventsView();
  #eventPresenter = new Map();
  #activeSort = SortType.DAY;
  #sortComponent = null;

  constructor(eventsListContainer, eventModel) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventModel = eventModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
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
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({resetSortType: true});
        this.#renderEvents();
        break;
    }
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  };

  #renderNoEvents = () => {
    render(this.#noEventsComponent, this.#eventsListComponent.element);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#activeSort === sortType) {
      return;
    }

    this.#activeSort = sortType;
    this.#clearEvents();
    this.#renderEvents();
  };

  #renderSort = () => {
    this.#sortComponent = new NewSortView(this.#sorts, this.#activeSort);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
  };

  #clearEvents = ({resetSortType = false} = {}) => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noEventsComponent);

    if (resetSortType) {
      this.#activeSort = SortType.DAY;
    }
  };

  #renderEvents = () => {
    render(this.#eventsListComponent, this.#eventsListContainer);

    if (this.events.length === 0) {
      this.#renderNoEvents();
    } else {
      for (let i = 0; i < this.events.length; i++) {
        this.#renderEvent(this.events[i]);
      }
    }

    this.#renderSort();
  };
}
