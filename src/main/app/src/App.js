import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import TranslationProvider from './commons/TranslationContext';
import Loading from './admin/layout/Loading';

import locales from './commons/locales';
import Layout from './commons/Layout';

export default () => {

    const Admin = lazy(() => import('./admin/App'));

    return <TranslationProvider
        locales={locales}
        i18n={locale => import(`./commons/i18n/${locale}`)}
    >
        <BrowserRouter>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to={{pathname: 'pages/home'}}/>}/>
                    <Route path="/admin" render={() => <Admin/>}/>
                    <Route component={Layout}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    </TranslationProvider>;
};