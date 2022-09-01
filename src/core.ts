import type { PayloadAction, ComponentType } from './models/store';
import { RootState } from './store/reducer';
export function html([first, ...str]: TemplateStringsArray, ...values: any[]) {
  return values
    .reduce(
      (acc: any[], value: any) => {
        return acc.concat(value, str.shift());
      },
      [first],
    )
    .filter((item) => (item && item !== true) || item === 0)
    .join('');
}

const createStore = (
  reducer: (
    state?: any,
    action?: PayloadAction,
    ...args: any[]
  ) => typeof state,
) => {
  let state = reducer();

  const roots = new Map<HTMLElement, ComponentType>();

  function render() {
    for (let [root, component] of roots.entries()) {
      root.innerHTML = component();
    }
  }

  return {
    attach(component: ComponentType, root: HTMLElement) {
      roots.set(root, component);
      render();
    },
    connect(selector = (state: RootState) => state) {
      return (component: ComponentType) => (props?: any) => {
        return component(Object.assign({}, props, selector(state)));
      };
    },
    dispatch(action: PayloadAction) {
      state = reducer(state, action);
      render();
    },
  };
};

export default createStore;
