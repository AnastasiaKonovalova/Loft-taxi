import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css';
import { Provider } from 'react-redux';

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
