import createStore from '../core.js';
import logger from '../utils/logger.js';
import reducer from './reducer.js';
const { attach, dispatch, connect } = createStore(logger(reducer));
window.dispatch = dispatch;
export { attach, connect };
