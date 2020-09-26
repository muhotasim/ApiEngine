import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from "./components/App";
const rootEl = document.getElementById('root');
const renderApp = () => {
    ReactDOM.render(
        <App />, rootEl
    );
}

renderApp();

export default hot(renderApp);