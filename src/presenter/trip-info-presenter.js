import {render, RenderPosition} from '../framework/render';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  #tripInfoContainer = null;

  #tripInfoComponent = new TripInfoView;

  init = (tripInfoContainer) => {
    this.#tripInfoContainer = tripInfoContainer;

    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  };
}
