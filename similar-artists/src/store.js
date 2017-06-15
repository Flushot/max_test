import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const middleware = [
    thunkMiddleware,
    createLogger({
        collapsed: true,
        diff: true,
        duration: true,
        logErrors: false
    })
];

const store = createStore(reducer, applyMiddleware.apply(this, middleware));

export default store;
