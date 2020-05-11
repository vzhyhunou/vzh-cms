import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import TranslationProvider from './commons/TranslationContext';
import Loading from './commons/Loading';

import locales from './commons/locales';
import Layout from './commons/Layout';
import resources from './admin/resources';

export default () => {

    const Admin = lazy(() => import('./admin/App'));

    return <TranslationProvider
        locales={locales}
        i18n={locale => import(`./commons/i18n/${locale}`)}
    >
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to={{pathname: 'pages/home'}}/>}/>
                    <Route path="/admin" render={() => <Admin resources={resources}/>}/>
                    <Route component={Layout}/>
                </Switch>
            </Suspense>
    </TranslationProvider>;
};