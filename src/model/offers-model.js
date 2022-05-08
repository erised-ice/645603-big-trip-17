import {generateOffers} from '../mock/offers';

export default class OffersModel {
  offers = generateOffers();

  getOffers = () => this.offers;
}
