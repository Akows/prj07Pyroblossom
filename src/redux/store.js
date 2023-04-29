import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducerIndex from "./reducers/reducerIndex";

const initialState = {
    user: {
        data: null,
        isLogin: false,
    },
};

const logMiddleware = (store) => (next) => (action) => {
    console.log('==========');
    console.log('Log Record.');
    console.log(action);
    console.log('Record End.');
    console.log('==========');
    next(action);
};

const thunkMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }
    return next(action);
};

const enhancer = composeWithDevTools(
    applyMiddleware(logMiddleware, thunkMiddleware)
);

const store = createStore(reducerIndex, initialState, enhancer);

export { store };