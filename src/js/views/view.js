import icon from '../../img/icons.svg';
export default class View {
  _data;

  /**
   * Render the received object to DOM
   * @param {OBJECT | OBJECT[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined | String} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Hasan
   * @todo finish implementation
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkUp();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkUp();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    const newElements = Array.from(newDOM.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  y;
  renderSpinner() {
    const markup = `<div class="spinner">
  <svg>
    <use href="${icon}#icon-loader"></use>
  </svg>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
          <svg>
            <use href="${icon}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
        <div>
          <svg>
            <use href="${icon}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
