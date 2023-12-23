import View from './view.js';
import { REC_PER_PAGE } from '../config.js';

class Pagination extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateRecipe() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / REC_PER_PAGE);
    if (curPage === 1 && numPages > 1)
      return `<div></div><div data-goto="${
        curPage + 1
      }" class="pagination__btn pagination_next__btn">
    page ${curPage + 1} &#8594;
  </div>`;
    if (numPages > curPage)
      return `<div data-goto="${
        curPage - 1
      }" class="pagination__btn pagination_prev__btn">
    &#8592; page ${curPage - 1}
  </div>
  <div data-goto="${curPage + 1}" class="pagination__btn pagination_next__btn">
    page ${curPage + 1} &#8594;
  </div>`;
    if (curPage === numPages && numPages > 1)
      return `<div data-goto="${
        curPage - 1
      }" class="pagination__btn pagination_prev__btn">
    &#8592; page ${curPage - 1}
  </div><div></div>`;

    return ``;
  }
}
export default new Pagination();
