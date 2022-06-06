import {render, replace, remove} from '../framework/render';
import NewEventView from '../view/event-view';
import NewEditFormView from '../view/edit-form-view';
import {userAction, UpdateType, UserAction} from "../const";

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
    this.#editFormComponent.setDeleteClickHandler(this.#handleDeleteClick);

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
      this.#editFormComponent.reset(this.#event);
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
      this.#editFormComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  };

  #handleOpenArrowClick = () => {
    this.#replaceEventToForm();
  };

  #handleCloseArrowClick = () => {
    this.#editFormComponent.reset(this.#event);
    this.#changeData(this.#event);
    this.#replaceFormToEvent();
  };

  #handleSaveClick = (update) => {
    const isMinorUpdate =
      this.#event.dateFrom !== update.dateFrom || this.#event.dateTo !== update.dateTo;

    this.#changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );

    this.#replaceFormToEvent();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {...this.#event, isFavorite: !this.#event.isFavorite},
    );
  };

  #handleDeleteClick = (event) => {
    this.#changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };
}
