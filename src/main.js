import {render} from './framework/render';
import NewFilterView from './view/filter-view';
import NewSortView from './view/sort-view';
import EventsListPresenter from './presenter/events-list-presenter';
import EventModel from './model/event-model';

const siteMainElement = document.querySelector('.trip-main');
const siteEventsElement = document.querySelector('.trip-events');

const eventModel = new EventModel();
const eventsListPresenter = new EventsListPresenter;

render(new NewFilterView(), siteMainElement);
render(new NewSortView(), siteEventsElement);

eventsListPresenter.init(siteEventsElement, eventModel);
