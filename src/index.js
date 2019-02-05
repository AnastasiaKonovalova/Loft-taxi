import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import RootRouter from './components/RootRouter';
import getStore, {sagaMiddleware} from './store/store';

import rootSaga from './store/middlewares';

const store = getStore();

sagaMiddleware.run(rootSaga);

ReactDOM.render(
        <Provider store={store}>
            <RootRouter/>
        </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
