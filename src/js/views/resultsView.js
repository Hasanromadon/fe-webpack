import previewView from './previewView';
previewView;
import View from './view';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find your query, please try another one!';

  _generateMarkUp() {
    return this._data.map((res) => previewView.render(res, false)).join('');
  }
}

export default new ResultsView();
