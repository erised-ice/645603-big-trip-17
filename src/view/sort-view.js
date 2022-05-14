import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (sort) => {
  const {value, name, isChecked, isDisabled} = sort;

  return (
    `<div class="trip-sort__item  trip-sort__item--${value}">
      <input
        id="sort-event"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="${value}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="${value}">${name}</label>
    </div>`
  );
};

const createNewSortViewTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((sort) => createSortItemTemplate(sort)).join('');

  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>
`);
};

export default class NewSortView extends AbstractView {
  #sorts = null;

  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createNewSortViewTemplate(this.#sorts);
  }
}
