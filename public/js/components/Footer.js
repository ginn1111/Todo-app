import { html } from '../core.js';
import { connect } from '../store/index.js';
const Footer = ({ todos, filters, filter }) => {
    var _a;
    return html `
    <footer class="footer">
      <span class="todo-count"
        ><strong>${(_a = todos.filter(filters.active).length) !== null && _a !== void 0 ? _a : 0}</strong> item
        left</span
      >
      <ul class="filters">
        ${Object.keys(filters).map((type) => html `
            <li>
              <a
                class="${filter === type && 'selected'}"
                href="#"
                onclick="dispatch({type: 'CHANGE_TYPE', payload: '${type}'})"
                >${type.charAt(0).toUpperCase() + type.slice(1)}</a
              >
            </li>
          `)}
      </ul>
      ${todos.some(filters.completed) &&
        '<button class="clear-completed" onclick="dispatch({type: \'CLEAR_COMPLETED\'})">Clear completed</button>'}
    </footer>
  `;
};
export default connect()(Footer);
