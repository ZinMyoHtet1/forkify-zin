import '../../src/../node_modules/core.js';
import '../../src/../node_modules/regenerator-runtime/runtime.js';
import * as model from './model.js';
import { API, KEY } from './config.js';
import '../../src/../node_modules/underscore';

// import * as model from './model.j'

import recipeView from './views/recipeView.js';
import searchRecipeView from './views/searchRecipeView.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

// const addRecipeBtn = document.querySelector('.addRecipe');
// const overlay = document.querySelector('.overlay');
// const container = document.querySelector('.container');
// const overlayCloseBtn = document.querySelector('.overlay_close__btn');
// const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

// // let isOverlay = false;

// const handlerToggleOverlay = function () {
//   overlay.classList.toggle('hidden');
//   container.classList.toggle('overlay_active');
//   // isOverlay = !isOverlay;
// };

// [addRecipeBtn, overlayCloseBtn].forEach(btn => {
//   btn.onclick = function () {
//     handlerToggleOverlay();
//   };
// });

// document.addEventListener('scroll',)

//https://forkify-api.herokuapp.com/api/v2/recipes
//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log('running1');
    if (!id) return;
    console.log('running2');
    recipeView.renderSpinner();

    resultsView.update(model.loadSearchResultsPage());
    await model.loadRecipe(`${API}/${id}?key=${KEY}`);

    // console.log('mm', model.state.recipe);
    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    resultsView.renderSpinner();
    await model.loadSearchResults(searchRecipeView.getQuery());

    resultsView.render(model.loadSearchResultsPage());
    // console.log(model.state);
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.loadSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (updateTo) {
  model.servingsUpdate(updateTo);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.isBookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (data) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(data);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarkView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err);
    console.error(err);
  }
};

const init = function () {
  // model.init();
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchRecipeView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

plugins: [
  {
    name: 'preset-default',
  },
  'cleanupIDs',
];
