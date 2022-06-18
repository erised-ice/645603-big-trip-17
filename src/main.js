import {render} from './framework/render';
import TripInfoPresenter from './presenter/trip-info-presenter';
import EventsListPresenter from './presenter/events-list-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventModel from './model/event-model';
import OffersModel from './model/offers-model';
import FilterModel from './model/filter-model';
import NewEventButtonView from './view/new-event-button-view';
import PointsApiService from './api/point-api-service';
import OffersApiService from './api/offers-api-service';
import DestinationsApiService from './api/destinations-api-service';
import DestinationsModel from './model/destinations-model';

const AUTHORIZATION = 'Basic ssd2fS11s33fjKJhu';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const offersApiService = new OffersApiService(END_POINT, AUTHORIZATION);
const destinationsApiService = new DestinationsApiService(END_POINT, AUTHORIZATION);

const siteMainElement = document.querySelector('.trip-main');
const siteEventsElement = document.querySelector('.trip-events');
const siteControlsElement = siteMainElement.querySelector('.trip-controls');
const siteFiltersElement = siteControlsElement.querySelector('.trip-controls__filters');

const eventModel = new EventModel(pointsApiService);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const eventsListPresenter = new EventsListPresenter(siteEventsElement, eventModel, offersModel, destinationsModel, filterModel);
const tripInfoPresenter = new TripInfoPresenter(siteMainElement, eventModel, offersModel);
const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel, eventModel);
const newEventButtonComponent = new NewEventButtonView();

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventsListPresenter.createEvent(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

Promise.all([pointsApiService.points, offersApiService.offers, destinationsApiService.destinations]).then((data) => {
  eventModel.init(data[0]);
  offersModel.init(data[1]);
  destinationsModel.init(data[2]);

  render(newEventButtonComponent, siteMainElement);
  newEventButtonComponent.setClickHandler(handleNewEventButtonClick);
  filterPresenter.init();
  tripInfoPresenter.init();
});

eventsListPresenter.init();
