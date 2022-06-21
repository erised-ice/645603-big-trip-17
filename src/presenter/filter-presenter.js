import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view';
import {filter} from '../utils/filter';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #eventModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, eventModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventModel = eventModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const events = this.#eventModel.events;

    return [
      {
        value: FilterType.EVERY,
        name: 'Everything',
        isDisable: filter[FilterType.EVERY](events).length <= 0
      },
      {
        value: FilterType.FUTURE,
        name: 'Future',
        isDisable: filter[FilterType.FUTURE](events) <= 0
      },
      {
        value: FilterType.PAST,
        name: 'Past',
        isDisable: filter[FilterType.PAST](events) <= 0
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
