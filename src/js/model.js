import { async } from 'regenerator-runtime';
import { AJAX } from './helper.js';
import { API, REC_PER_PAGE, KEY } from './config.js';
import addRecipeView from './views/addRecipeView.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    results: [],
    recipePerPage: REC_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (url) {
  // console.log(response, data);
  try {
    const data = await AJAX(url);
    if (data.ok) throw new Error();
    // console.log('data', data);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === data.data.recipe.id))
      state.recipe.isBookmarked = true;
    else state.recipe.isBookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API}?search=${query}&key=${KEY}`);
    if (data.data.recipes.length === 0) throw new Error();
    state.search.results = data.data.recipes.map(rec => {
      // console.log(rec.recipe_id);
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResultsPage = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * 10;
  const end = page * 10;
  return state.search.results.slice(start, end);
};

export const servingsUpdate = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.isBookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === id) state.recipe.isBookmarked = false;
  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const dataArr = Array.from(newRecipe);
    const data = Object.fromEntries(dataArr);
    const ingredients = dataArr
      .filter(data => data[0].startsWith('ing') && data[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error('Wrong Ingredient format.Please use correct form!');

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // console.log(ingredients);
    const recipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.imageUrl,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients,
    };
    // console.log(recipe);
    const res = await AJAX(`${API}?key=${KEY}`, recipe);

    state.recipe = createRecipeObject(res);
    addBookmark(state.recipe);
    console.log(state.recipe);
  } catch (err) {
    // addRecipeView.renderError(err);
    throw err;
  }
};

export const init = function () {
  const storage = localStorage.getItem('bookmarks');
  // if (!storage) return;
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
console.log(state.recipe);
