const recipeContainer = document.querySelector('.recipe');
import * as model from './models/model';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView';
import searchView from './views/searchView';
import bookmarkView from './views/bookmarkView';
import addRecipeView from './views/addRecipeView';

const controlRecipe = async () => {
  //loading receipe
  try {
    // get id from url
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 1. update active link
    resultsView.update(model.getSearchResultPage());

    bookmarkView.update(model.state.bookmarks);
    // 2. Load receipt
    await model.loadRecipe(id);
    //3. rendering receipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async () => {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(er);
  }
};

const controlPagination = (gotoPage) => {
  console.log(gotoPage);
  resultsView.render(model.getSearchResultPage(gotoPage));

  paginationView.render(model.state.search);
};

const controlServings = (newServings) => {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const controlBoookmarks = () => {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async (newRecipe) => {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();
    setTimeout(() => {
      addRecipeView.tonggleWindow();
    }, 2000);

    bookmarkView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`); //change url without reload
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = () => {
  bookmarkView.addHandlerRender(controlBoookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

// window.addEventListener('hashchange', showReceipe);
// window.addEventListener('load', showReceipe);
