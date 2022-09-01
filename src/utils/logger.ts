import { PayloadAction } from '../models/store';
import { RootState } from '../store/reducer';

const logger = (
  reducer: (state?: RootState, action?: PayloadAction) => RootState,
) => {
  return (state?: RootState, action?: PayloadAction) => {
    console.group(action?.type);
    console.log('Payload: ', action?.payload);
    console.log('PrevState: ', state);
    const nextState = reducer(state, action);
    console.log('NextState: ', nextState);
    console.groupEnd();

    return nextState;
  };
};

export default logger;
