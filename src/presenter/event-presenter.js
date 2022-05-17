import {render, replace, remove} from '../framework/render';
import NewEventView from '../view/event-view';
import NewEditFormView from '../view/edit-form-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #changeData = null;
  #changeMode = null;

  #eventComponent = null;
  #editFormComponent = null;

  #event = null;
  #mode = Mode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (event) => {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#eventComponent = new NewEventView(event);
    this.#editFormComponent = new NewEditFormView(event);

    this.#eventComponent.setOpenArrowClickHandler(this.#handleOpenArrowClick);
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editFormComponent.setCloseArrowClickHandler(this.#handleCloseArrowClick);
    this.#editFormComponent.setSaveClickHandler(this.#handleSaveClick);

    if (prevEventComponent === null || prevEditFormComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEditFormComponent);
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#editFormComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  };

  #replaceEventToForm = () => {
    replace(this.#editFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#editFormComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

  #handleCloseArrowClick = (event) => {
    this.#changeData(event);
    this.#replaceFormToEvent();
  };

  #handleSaveClick = (event) => {
    this.#changeData(event);
    this.#replaceFormToEvent();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#event, isFavorite: !this.#event.isFavorite});
  };
}
