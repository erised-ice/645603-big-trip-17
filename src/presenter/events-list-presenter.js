import {remove, render, RenderPosition} from '../framework/render';
import NewTripEventsListView from '../view/trip-events-list-view';
import NoEventsView from '../view/no-events-view';
import LoadingView from '../view/loading-view';
import EventPresenter from './event-presenter';
import EventNewPresenter from './event-new-presenter';
import NewSortView from '../view/sort-view';
import {generateSort} from '../mock/sort';
import {sortEventsByDate, sortEventsByTime, sortEventsByPrice} from '../utils/sort';
import {filter} from '../utils/filter';
import {SortType, UpdateType, UserAction, FilterType} from '../const';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #sorts = generateSort();

  #eventsListComponent = new NewTripEventsListView();
  #noEventsComponent = null;
  #loadingComponent = new LoadingView();
  #eventPresenter = new Map();
  #eventNewPresenter = null;
  #activeSort = SortType.DAY;
  #sortComponent = null;
  #filterType = FilterType.EVERY;
  #isLoading = true;

  constructor(eventsListContainer, eventModel, offersModel, destinationsModel, filterModel) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventModel = eventModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#eventNewPresenter = new EventNewPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#offersModel, this.#destinationsModel);

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#activeSort) {
      case SortType.DAY:
        return filteredEvents.sort(sortEventsByDate);
      case SortType.TIME:
        return filteredEvents.sort(sortEventsByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortEventsByPrice);
    }

    return filteredEvents;
  }

  init = () => {
    this.#renderEvents();
  };

  createEvent = (callback) => {
    this.#activeSort = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERY);
    this.#eventNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenter.get(update.id).setSaving();
        this.#eventModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventNewPresenter.setSaving();
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenter.get(update.id).setDeleting();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearEvents();
        this.#renderEvents();
        break;
    }
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange, this.#offersModel, this.#destinationsModel);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  };

  #renderNoEvents = () => {
    this.#noEventsComponent = new NoEventsView(this.#filterType);
    render(this.#noEventsComponent, this.#eventsListComponent.element);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#eventsListComponent.element);
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
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#activeSort = SortType.DAY;
    }
  };

  #renderEvents = () => {
    render(this.#eventsListComponent, this.#eventsListContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

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
