class SearchRecipeView {
  #parentEl = document.querySelector('.searchbar');

  getQuery() {
    const query = document.querySelector('#searchBar').value;
    if (!query) return;
    document.querySelector('#searchBar').value = '';
    return query;
  }

  addHandlerSearch(handler) {
    const submitBtn = this.#parentEl.querySelector('.searchBtn');
    submitBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchRecipeView();
