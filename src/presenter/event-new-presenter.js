import {render, remove, RenderPosition} from '../framework/render';
import NewEditFormView from '../view/edit-form-view';
import {UpdateType, UserAction, DESTINATIONS} from '../const';
import {nanoid} from 'nanoid';
import {hasData} from '../utils/utils';

export default class EventNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #editFormComponent = null;
  #destroyCallback = null;

  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editFormComponent !== null) {
      return;
    }

    this.#editFormComponent = new NewEditFormView({isAddForm: true});
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
    const hasDestination = hasData(event.destination, DESTINATIONS);

    if (!hasDestination) {
      /*console.log('No such kind of destination');*/
      return;/* make proper error message */
    }

    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
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
