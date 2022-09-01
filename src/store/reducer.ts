import { PayloadAction } from '../models/store';
import { Todo } from '../models/todo';

const TODO_LIST = 'TODO_LIST';

const storage = {
  get(): any {
    return JSON.parse(localStorage.getItem(TODO_LIST) ?? '[]');
  },
  set(todos: Todo[]) {
    localStorage.setItem(TODO_LIST, JSON.stringify(todos));
  },
};

interface Filters {
  all(): boolean;
  active(todo: Todo): boolean;
  completed(todo: Todo): boolean;
}
const initialState: {
  filter: keyof Filters;
  todos: Todo[];
  filters: Filters;
  editIndex: number | null;
} = {
  todos: storage.get(),
  filter: 'all',
  filters: {
    all: () => true,
    active: (todo: Todo) => !todo.completed,
    completed: (todo: Todo) => todo.completed,
  },
  editIndex: null,
};

function newTodo(title: string) {
  return {
    id: Date.now(),
    title,
    completed: false,
  };
}

export type RootState = typeof initialState;
function reducer(state = initialState, action?: PayloadAction): RootState {
  switch (action?.type) {
    case 'ADD': {
      const updatedTodos = [...state.todos, newTodo(action.payload)];
      storage.set(updatedTodos);
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'TOGGLE': {
      const updatedTodos = [...state.todos];
      updatedTodos[action.payload].completed =
        !updatedTodos[action.payload].completed;

      storage.set(updatedTodos);
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'DELETE': {
      const updatedTodos = [...state.todos];
      updatedTodos.splice(action.payload, 1);
      storage.set(updatedTodos);
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'EDIT': {
      return {
        ...state,
        editIndex: action.payload,
      };
    }
    case 'CANCEL_EDIT': {
      return {
        ...state,
        editIndex: null,
      };
    }
    case 'SAVE_EDIT': {
      const updatedTodos = [...state.todos];
      if (action.payload.title) {
        updatedTodos[action.payload.index].title = action.payload.title;
      } else {
        updatedTodos.splice(action.payload.index, 1);
      }
      storage.set(updatedTodos);
      return {
        ...state,
        editIndex: null,
        todos: updatedTodos,
      };
    }
    case 'FILTER': {
      return {
        ...state,
      };
    }
    case 'CLEAR_COMPLETED': {
      const updatedTodos = [...state.todos].filter(state.filters.active);
      storage.set(updatedTodos);
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'CHANGE_TYPE': {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case 'CHECK_ALL': {
      const updatedTodos = [...state.todos];
      updatedTodos.forEach((todo) => (todo.completed = action.payload));
      storage.set(updatedTodos);
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    default:
      return state;
  }
}

export default reducer;
