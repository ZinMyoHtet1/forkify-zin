import View from './view.js';
import previewView from './previewView.js';
class ResultsView extends View {
  _parentEl = document.querySelector('.bookmarks_list');
  _errorMessage = "&#9888; We can't find recipes by this query.Try another one";
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateRecipe() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultsView();
