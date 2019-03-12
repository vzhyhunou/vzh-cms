import React, {Component, lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {createAdminStore, Loading, TranslationProvider} from 'react-admin';

import restProvider from './commons/rest';
import authProvider from './admin/auth';
import addUploadFeature from './admin/upload';
import {i18nLoader, i18nProvider} from './commons/locales';
import cmsReducer from './admin/reducer';
import Layout from './commons/Layout';
import routes from './routes';

const locales = {
    "en": "English",
    "ru": "Русский"
};

export default class extends Component {

    componentDidMount() {
        i18nLoader(locales, l => import(`./commons/i18n/${l}`)).then(state => this.setState(state));
    }

    render() {
        if (!this.state)
            return <div/>;

        const dataProvider = addUploadFeature(restProvider());
        const history = createHistory({basename: '/admin'});
        const customReducers = {cms: cmsReducer};
        const {locale} = this.state;
        const Admin = lazy(() => import('./admin/App'));

        return <Provider
            store={createAdminStore({
                authProvider,
                dataProvider,
                i18nProvider,
                customReducers,
                history,
                locale
            })}
        >
            <TranslationProvider>
                <BrowserRouter>
                    <Suspense fallback={<Loading/>}>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={{pathname: 'pages/home'}}/>}/>
                            <Route path="/admin" render={() => <Admin history={history}/>}/>
                            <Route render={() => <Layout routes={routes}/>}/>
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </TranslationProvider>
        </Provider>;
    }
};