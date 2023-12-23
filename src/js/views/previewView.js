import View from './view.js';
class PreviewView extends View {
  _parentEl = '';

  _generateRecipe() {
    // console.log(this._data);
    return `<li class="search_item  ${
      window.location.hash.slice(1) === this._data.id ? 'recipe__active' : ''
    }">
    <a href="#${this._data.id}">
      <img src="${this._data.image}" alt="img" />
      <div class="name_direction">
        <div class="name">${this._data.title}</div>
        <div class="direction">${this._data.publisher}</div>
      </div>
      <div class="user ${this._data.key ? '' : 'hidden'}">
      <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15"
            width="15"
            viewBox="0 0 448 512"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>
      </div>
    </a>
  </li>`;
  }
}

export default new PreviewView();
