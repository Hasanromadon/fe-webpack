import View from './view';
import icon from '../../img/icons.svg';
class PaginantionView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkUp() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    const currPage = this._data.page;
    //page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `<button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // last page
    if (currPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currPage - 1
      }"  class="btn--inline pagination__btn--prev">
      <svg class="search__icon" 
        <use href="${icon}#icon-arrow-left"></use>
      </svg>
      <span>${currPage - 1} </span>
    </button>`;
    }
    // other page
    if (currPage < numPages) {
      return `<button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-right"></use>
      </svg>
    </button>
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-left"></use>
      </svg>
      <span>${currPage - 1} </span>
    </button>`;
    }
    // pag1. and there are no other page
    return '';
  }
}

export default new PaginantionView();
