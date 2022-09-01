const logger = (reducer) => {
    return (state, action) => {
        console.group(action === null || action === void 0 ? void 0 : action.type);
        console.log('Payload: ', action === null || action === void 0 ? void 0 : action.payload);
        console.log('PrevState: ', state);
        const nextState = reducer(state, action);
        console.log('NextState: ', nextState);
        console.groupEnd();
        return nextState;
    };
};
export default logger;
