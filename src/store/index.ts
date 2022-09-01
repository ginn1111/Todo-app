import createStore from '../core.js';
import { PayloadAction } from '../models/store.js';
import logger from '../utils/logger.js';
import reducer from './reducer.js';

const { attach, dispatch, connect } = createStore(logger(reducer));

declare global {
  interface Window {
    dispatch(action: PayloadAction): void;
  }
}

window.dispatch = dispatch;
export { attach, connect };
