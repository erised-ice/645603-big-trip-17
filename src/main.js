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
const tripInfoPresenter = new TripInfoPresenter;
const eventsListPresenter = new EventsListPresenter;

const filters = generateFilter();
const sorts = generateSort();

render(new NewFilterView(filters), siteFiltersElement);
render(new NewSortView(sorts), siteEventsElement);

tripInfoPresenter.init(siteMainElement);
eventsListPresenter.init(siteEventsElement, eventModel);
