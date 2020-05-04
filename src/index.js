import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nProvider } from '@lingui/react';
import { i18n, defaultLocale } from './i18n';

import App from './App';
import store from './store/Store';

import 'antd/dist/antd.css';
import './assets/css/common.css';

i18n.activate(defaultLocale);

ReactDOM.render(
    <I18nProvider i18n={i18n}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </I18nProvider>
    , document.getElementById('root')
);
