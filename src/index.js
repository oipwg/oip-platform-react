import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'

import reducers from './reducers'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger({
    collapsed: true
});

let middleware = [ logger, thunk ];

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: "Alexandria React"
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);
export const store = createStore(combineReducers(reducers), enhancer);


ReactDOM.render(
    	<App store={store} />,
	document.getElementById('root')
);

registerServiceWorker();

