const TODO_LIST = 'TODO_LIST';
const storage = {
    get() {
        var _a;
        return JSON.parse((_a = localStorage.getItem(TODO_LIST)) !== null && _a !== void 0 ? _a : '[]');
    },
    set(todos) {
        localStorage.setItem(TODO_LIST, JSON.stringify(todos));
    },
};
const initialState = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: (todo) => !todo.completed,
        completed: (todo) => todo.completed,
    },
    editIndex: null,
};
function newTodo(title) {
    return {
        id: Date.now(),
        title,
        completed: false,
    };
}
function reducer(state = initialState, action) {
    switch (action === null || action === void 0 ? void 0 : action.type) {
        case 'ADD': {
            const updatedTodos = [...state.todos, newTodo(action.payload)];
            storage.set(updatedTodos);
            return Object.assign(Object.assign({}, state), { todos: updatedTodos });
        }
        case 'TOGGLE': {
            const updatedTodos = [...state.todos];
            updatedTodos[action.payload].completed =
                !updatedTodos[action.payload].completed;
            storage.set(updatedTodos);
            return Object.assign(Object.assign({}, state), { todos: updatedTodos });
        }
        case 'DELETE': {
            const updatedTodos = [...state.todos];
            updatedTodos.splice(action.payload, 1);
            storage.set(updatedTodos);
            return Object.assign(Object.assign({}, state), { todos: updatedTodos });
        }
        case 'EDIT': {
            return Object.assign(Object.assign({}, state), { editIndex: action.payload });
        }
        case 'CANCEL_EDIT': {
            return Object.assign(Object.assign({}, state), { editIndex: null });
        }
        case 'SAVE_EDIT': {
            const updatedTodos = [...state.todos];
            if (action.payload.title) {
                updatedTodos[action.payload.index].title = action.payload.title;
            }
            else {
                updatedTodos.splice(action.payload.index, 1);
            }
            storage.set(updatedTodos);
            return Object.assign(Object.assign({}, state), { editIndex: null, todos: updatedTodos });
        }
        case 'FILTER': {
            return Object.assign({}, state);
        }
        case 'CLEAR_COMPLETED': {
            const updatedTodos = [...state.todos].filter(state.filters.active);
            storage.set(updatedTodos);
            return Object.assign(Object.assign({}, state), { todos: updatedTodos });
        }
        case 'CHANGE_TYPE': {
            return Object.assign(Object.assign({}, state), { filter: action.payload });
        }
        case 'CHECK_ALL': {
            const updatedTodos = [...state.todos];
            updatedTodos.forEach((todo) => (todo.completed = action.payload));
            storage.set(updatedTodos);
            return Object.assign(Object.assign({}, state), { todos: updatedTodos });
        }
        default:
            return state;
    }
}
export default reducer;
