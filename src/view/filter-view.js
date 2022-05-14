import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter) => {
  const {value, name, count} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-everything"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${value}"
        ${count === 0 ? 'disabled' : ''}
        checked
      >
      <label class="trip-filters__filter-label" for="filter-everything">
        ${name}
      </label>
    </div>`
  );
};

const createNewFilterViewTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter)).join('');

  return (`
  <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`);
};

export default class NewFilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createNewFilterViewTemplate(this.#filters);
  }
}
