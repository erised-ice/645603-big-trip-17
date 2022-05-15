import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (sort, activeSort) => {
  const {value, name, isDisabled} = sort;

  return (
    `<div class="trip-sort__item  trip-sort__item--${value}">
      <input
        id="sort-event"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="${value}"
        ${activeSort === value ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="${value}">${name}</label>
    </div>`
  );
};

const createNewSortViewTemplate = (sortItems, activeSort) => {
  const sortItemsTemplate = sortItems
    .map((sort) => createSortItemTemplate(sort, activeSort)).join('');

  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>
`);
};

export default class NewSortView extends AbstractView {
  #sorts = null;
  #activeSort = null;

  constructor(sorts, activeSort) {
    super();
    this.#sorts = sorts;
    this.#activeSort = activeSort;
  }

  get template() {
    return createNewSortViewTemplate(this.#sorts, this.#activeSort);
  }
}
