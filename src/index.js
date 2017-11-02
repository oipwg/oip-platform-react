import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger({
    //empty options
});

let middleware = [ logger, thunk ];

let store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

ReactDOM.render(
    	<App store={store} />,
	document.getElementById('root')
);

registerServiceWorker();
