import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import * as Actions from './actions';

const middleware = [
    thunkMiddleware,
    createLogger({
        collapsed: true,
        diff: true,
        duration: true,
        logErrors: false
    })
];

// Register with redux devtools chrome extension
const composeFunc = (
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Redux devtools options
            maxAge: 100  // Max number of actions to store in undo buffer
        })
        : compose
);

const store = createStore(reducer, composeFunc(applyMiddleware.apply(this, middleware)));

export default store;
