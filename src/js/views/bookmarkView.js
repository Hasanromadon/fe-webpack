import previewView from './previewView';
import View from './view';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark yet, Find a nice recipe and bookmark it';

  _generateMarkUp() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView();
