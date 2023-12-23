import View from './view.js';
import previewView from './previewView.js';
class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = "&#9888; We can't find recipes by this query.Try another one";
  _message = '';

  _generateRecipe() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
