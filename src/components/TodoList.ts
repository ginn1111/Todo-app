import { html } from '../core.js';
import { connect } from '../store/index.js';
import type { Todo } from '../models/todo';
import TodoListItem from './TodoListItem.js';
import { RootState } from '../store/reducer.js';

const TodoList = ({ todos, filter, filters }: RootState) => {
  return html`
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        onchange="dispatch({type: 'CHECK_ALL', payload: this.checked})"
        ${todos.every(filters.completed) && 'checked'}
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        ${todos
          .filter(filters[filter])
          .map((todo, index) => TodoListItem({ ...todo, index }))}
      </ul>
    </section>
  `;
};

export default connect()(TodoList);
