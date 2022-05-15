import {render} from './framework/render';
import NewFilterView from './view/filter-view';
import NewSortView from './view/sort-view';
import TripInfoPresenter from './presenter/trip-info-presenter';
import EventsListPresenter from './presenter/events-list-presenter';
import EventModel from './model/event-model';
import {generateFilter} from './mock/filter';
import {generateSort} from './mock/sort';

const siteMainElement = document.querySelector('.trip-main');
const siteEventsElement = document.querySelector('.trip-events');
const siteControlsElement = siteMainElement.querySelector('.trip-controls');
const siteFiltersElement = siteControlsElement.querySelector('.trip-controls__filters');

const eventModel = new EventModel();
const eventsListPresenter = new EventsListPresenter(siteEventsElement, eventModel);
const tripInfoPresenter = new TripInfoPresenter;

const activeFilter = 'everything';
const filters = generateFilter(eventModel.events);
const activeSort = 'time';
const sorts = generateSort();

render(new NewSortView(sorts, activeSort), siteEventsElement);
render(new NewFilterView(filters, activeFilter), siteFiltersElement);

tripInfoPresenter.init(siteMainElement);
eventsListPresenter.init();
