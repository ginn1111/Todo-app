import { html } from '../core.js';
import { connect } from '../store/index.js';
const TodoListItem = ({ title, completed, index, editIndex, }) => {
    return html `
    <li
      class="view ${completed && 'completed'} ${index === editIndex &&
        'editing'}"
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          ${completed && 'checked'}
          onchange="dispatch({type: 'TOGGLE', payload: ${index}})"
        />
        <label ondblclick="dispatch({type: 'EDIT', payload: ${index}})"
          >${title}</label
        >
        <button
          class="destroy"
          onclick="dispatch({type: 'DELETE', payload: ${index}})"
        ></button>
      </div>
      <input
        autofocus
        onkeyup="event.keyCode === 13 && dispatch({type: 'SAVE_EDIT', payload: {index: ${index}, title: this.value.trim()}}) || event.keyCode === 27 && dispatch({type: 'CANCEL_EDIT'})"
        onblur="dispatch({type: 'CANCEL_EDIT'})"
        class="edit"
        value="${title}"
      />
    </li>
  `;
};
export default connect()(TodoListItem);
