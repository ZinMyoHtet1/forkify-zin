import View from './view.js';
class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = '&#9888; We could not find the recipe.Try it again.';
  _message = '';

  //rendering recipe
  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.servings_btn');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerBookmark(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateRecipe() {
    // console.log(this._data);
    // if (!this._data) return;
    return `
    <section id="recipe_header">
    <div class="recipe_cover">
    <img src="${this._data.image}" alt="${this._data.title}">
    </div>
      <div class="recipe_name">
        <span>${this._data.title}</span>
      </div>
    </section>
    <section id="serving">
      <div class="serving_time">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 512 512"
        >
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
          <path
            d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
          />
        </svg>
        <span>${this._data.cookingTime}</span> minutes
      </div>
      <div class="serving_number">
        <div class="serving_number_amount">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 448 512"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
            <path
              d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
            />
          </svg>
          <span>${this._data.servings}</span> servings
        </div>
        <div class="plus_minus">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 512 512"
            class="servings_btn button_effect"
            data-update-to="${this._data.servings + 1}"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 512 512"
            class="servings_btn button_effect"
            data-update-to="${this._data.servings - 1}"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
            />
          </svg>
        </div>
      </div>
      <div class="bookmark_user">
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
        <div class="bookmark button_effect ${
          this._data.isBookmarked ? 'bookmark_added' : ''
        }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25"
            width="25"
            viewBox="0 0 384 512"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
            <path
              d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
            />
          </svg>
        </div>
      </div>
    </section>
    <section id="ingredient">
      <h2 class="title">Recipe ingredients</h2>
      <ul class="ingredient_list">
      ${this._data.ingredients
        .map(
          ing => `
      <li class="ing_item">
      <span class="check"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="14"
          viewBox="0 0 448 512"
        >
          <path
            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          /></svg
      ></span>
      <span class="amount">${ing.quantity}</span><span>${ing.unit}</span>${ing.description}
    </li>`
        )
        .join('')}
        
      </ul>
    </section>
    <footer>
      <h2>How to cook it</h2>
      <p class="description">
        This recipe is carefully designed and tested by <span class="publisher">${
          this._data.publisher
        }</span>.Please check out directions at their website.
      </p>
      <a href="${
        this._data.sourceUrl
      }" class="closet_cooking">directions &#8594;</a>
    </footer>
        `;
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
}
export default new RecipeView();
