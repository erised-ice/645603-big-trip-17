import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (sort, activeSort) => {
  const {value, name, isDisabled} = sort;

  return (
    `<div class="trip-sort__item trip-sort__item--${value}">
      <input
        id="sort-event"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="${value}"
        ${activeSort === value ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label data-sort-type="${value}" class="trip-sort__btn" for="${value}">${name}</label>
    </div>`
  );
};

const createSortViewTemplate = (sortItems, activeSort) => {
  const sortItemsTemplate = sortItems
    .map((sort) => createSortItemTemplate(sort, activeSort)).join('');

  return (`
  <form class="trip-events__trip-sort trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>
`);
};

export default class SortView extends AbstractView {
  #sorts = null;
  #activeSort = null;

  constructor(sorts, activeSort) {
    super();
    this.#sorts = sorts;
    this.#activeSort = activeSort;
  }

  get template() {
    return createSortViewTemplate(this.#sorts, this.#activeSort);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL' || evt.target.dataset.sortType === this.#activeSort) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this.#activeSort = evt.target.dataset.sortType;
  };
}
