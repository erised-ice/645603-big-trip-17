import {render, replace, remove} from '../framework/render';
import NewEventView from '../view/event-view';
import NewEditFormView from '../view/edit-form-view';
import {UpdateType, UserAction} from '../const';

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
  #offersModel = null;
  #destinationsModel = null;

  #event = null;
  #mode = Mode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode, offersModel, destinationsModel) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init = (event) => {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#eventComponent = new NewEventView(event, this.#offersModel.offers);
    this.#editFormComponent = new NewEditFormView({event}, this.#offersModel.offers, this.#destinationsModel.destinations);

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
      replace(this.#eventComponent, prevEditFormComponent);
      this.#mode = Mode.DEFAULT;
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

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormComponent.shake(resetFormState);
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
      this.#event.dateFrom !== update.dateFrom || this.#event.dateTo !== update.dateTo || this.#event.basePrice !== update.basePrice;

    this.#changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
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
