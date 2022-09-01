import { html } from '../core.js';
import Footer from './Footer.js';
import Header from './Header.js';
import TodoList from './TodoList.js';

const App = () => {
  return html`<section class="todoapp">
    ${Header()} ${TodoList()}${Footer()}
  </section> `;
};

export default App;
