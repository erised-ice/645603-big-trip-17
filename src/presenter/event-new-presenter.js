import {render, remove, RenderPosition} from '../framework/render';
import NewEditFormView from '../view/edit-form-view';
import {UpdateType, UserAction} from '../const';

export default class EventNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #offersModel = null;
  #destinationsModel = null;
  #editFormComponent = null;
  #destroyCallback = null;

  constructor(eventListContainer, changeData, offersModel, destinationsModel) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editFormComponent !== null) {
      return;
    }
    this.#editFormComponent = new NewEditFormView({isAddForm: true}, this.#offersModel.offers, this.#destinationsModel.destinations);

    this.#editFormComponent.setSaveClickHandler(this.#handleSaveClick);

    this.#editFormComponent.setCancelClickHandler(this.#handleCancelClick);

    render(this.#editFormComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editFormComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editFormComponent);
    this.#editFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleSaveClick = (event) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
    );

    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
