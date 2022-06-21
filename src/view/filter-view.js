import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, activeFilter) => {
  const {value, name, isDisable} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${value}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${value}"
        ${isDisable ? 'disabled' : ''}
        ${activeFilter === value ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${value}">
        ${name}
      </label>
    </div>`
  );
};

const createFilterViewTemplate = (filterItems, activeFilter) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, activeFilter)).join('');

  return (`
  <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`);
};

export default class FilterView extends AbstractView {
  #filters = null;
  #activeFilter = null;

  constructor(filters, activeFilter) {
    super();
    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createFilterViewTemplate(this.#filters, this.#activeFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
