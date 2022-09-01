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
            return (component) => (props) => {
                return component(Object.assign({}, props, selector(state)));
            };
        },
        dispatch(action) {
            state = reducer(state, action);
            render();
        },
    };
};
export default createStore;
