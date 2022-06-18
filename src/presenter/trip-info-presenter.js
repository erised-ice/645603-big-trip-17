import {remove, render, RenderPosition, replace} from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import {sortEventsByDate} from '../utils/sort';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #eventModel = null;
  #offersModel = null;

  #tripInfoComponent = null;

  constructor(tripInfoContainer, eventModel, offersModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventModel = eventModel;
    this.#offersModel = offersModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  get tripInfo() {
    const events = this.#eventModel.events;
    const offers = this.#offersModel.offers;
    const eventsByDate = events.sort(sortEventsByDate);
    const firstEvent = eventsByDate[0];
    const lastEvent = eventsByDate[events.length - 1];
    const totalBasePrice = events.reduce((sum, event) => sum + event.basePrice, 0);

    const totalOffersPrice = events.reduce((sum, event) => {
      const offerByEventType = offers.find((offer) => offer.type === event.type);

      if (!offerByEventType) {
        return sum;
      }

      event.offers.forEach((offerId) => {
        const offer = offerByEventType.offers.find((item) => item.id === offerId);

        if (offer) {
          sum += offer.price;
        }
      });

      return sum;
    }, 0);

    return {
      destinations: eventsByDate.map((item) => item.destination.name),
      dateFrom: firstEvent.dateFrom,
      dateTo: lastEvent.dateTo,
      totalPrice: totalBasePrice + totalOffersPrice
    };
  }

  init = () => {
    const tripInfo = this.tripInfo;
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView(tripInfo);

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
