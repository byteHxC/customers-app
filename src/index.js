import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store/index';

const rootComponent = (
    <Provider store={store}> 
        <App />
    </Provider>
)
ReactDOM.render(rootComponent, document.getElementById('root'));
registerServiceWorker();
