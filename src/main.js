import TripInfoPresenter from './presenter/trip-info-presenter';
import EventsListPresenter from './presenter/events-list-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventModel from './model/event-model';
import FilterModel from './model/filter-model';
import NewEventButtonView from './view/new-event-button-view';
import {render} from './framework/render';

const siteMainElement = document.querySelector('.trip-main');
const siteEventsElement = document.querySelector('.trip-events');
const siteControlsElement = siteMainElement.querySelector('.trip-controls');
const siteFiltersElement = siteControlsElement.querySelector('.trip-controls__filters');
const eventModel = new EventModel();
const filterModel = new FilterModel();
const eventsListPresenter = new EventsListPresenter(siteEventsElement, eventModel, filterModel);
const tripInfoPresenter = new TripInfoPresenter;
const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, eventModel);
const newEventButtonComponent = new NewEventButtonView();

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventsListPresenter.createEvent(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

render(newEventButtonComponent, siteMainElement);
newEventButtonComponent.setClickHandler(handleNewEventButtonClick);

tripInfoPresenter.init(siteMainElement);
filterPresenter.init();
eventsListPresenter.init();
