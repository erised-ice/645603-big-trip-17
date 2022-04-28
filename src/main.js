import {render} from './render.js';
import NewFilterView from './view/filter-view';
import NewSortView from './view/sort-view';
import EventsListPresenter from './presenter/events-list-presenter';

const siteMainElement = document.querySelector('.trip-main');
const siteEventsElement = document.querySelector('.trip-events');
const eventsListPresenter = new EventsListPresenter;

render(new NewFilterView(), siteMainElement);
render(new NewSortView(), siteEventsElement);

eventsListPresenter.init(siteEventsElement);
