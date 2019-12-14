import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';
import ErrorBoundary from './ErrorBoundary';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';
import rootStore from './store';


const store = createStore(rootStore, applyMiddleware(compose(thunk)));
ReactDOM.render(<ErrorBoundary><Provider
    store={store}><App/></Provider></ErrorBoundary>, document.getElementById('app'));
