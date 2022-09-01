export function html([first, ...str], ...values) {
    return values
        .reduce((acc, value) => {
        return acc.concat(value, str.shift());
    }, [first])
        .filter((item) => (item && item !== true) || item === 0)
        .join('');
}
const createStore = (reducer) => {
    let state = reducer();
    const roots = new Map();
    function render() {
        for (let [root, component] of roots.entries()) {
            root.innerHTML = component();
        }
    }
    return {
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect(selector = (state) => state) {
            return (component) => (props, ...args) => component(Object.assign({}, props, args, selector(state)));
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        },
    };
};
export default createStore;
