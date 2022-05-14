import {render, replace} from '../framework/render';
import NewEventView from '../view/event-view';
import NewEditFormView from '../view/edit-form-view';

export default class EventPresenter {
  #eventListContainer = null;

  #eventComponent = null;
  #editFormComponent = null;

  #event = null;

  constructor(eventListContainer) {
    this.#eventListContainer = eventListContainer;
  }

  init = (event) => {
    this.#event = event;

    this.#eventComponent = new NewEventView(event);
    this.#editFormComponent = new NewEditFormView(event);

    this.#eventComponent.setOpenArrowClickHandler(this.#handleOpenArrowClick);
    this.#editFormComponent.setCloseArrowClickHandler(this.#handleCloseArrowClick);
    this.#editFormComponent.setSaveClickHandler(this.#handleSaveClick);

    render(this.#eventComponent, this.#eventListContainer);
  };

  #replaceEventToForm = () => {
    replace(this.#editFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#editFormComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #handleOpenArrowClick = () => {
    this.#replaceEventToForm();
  };

  #handleCloseArrowClick = () => {
    this.#replaceFormToEvent();
  };

  #handleSaveClick = () => {
    this.#replaceFormToEvent();
  };
}
