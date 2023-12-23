import View from './view.js';
class AddRecipeView extends View {
  _parentEl = document.querySelector('.add_recipe_form');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.window');
  _closeBtn = document.querySelector('.overlay_close__btn');
  _openBtn = document.querySelector('.addRecipe');
  _container = document.querySelector('.container');
  _uploadBtn = document.querySelector('#recipe_upload');
  _message = 'Successfully uploaded new recipe';

  constructor() {
    super();
    this._addHandlerOpenWindow();
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._container.classList.toggle('overlay_active');
  }

  _addHandlerOpenWindow() {
    this._openBtn.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(new FormData(this));
    });
  }
  _generateMarkup() {}
}
export default new AddRecipeView();
