import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Layout from './commons/Layout';
import routes from './routes';
import TranslationProvider from './commons/TranslationContext';
import Loading from './admin/layout/Loading';

export default () => {

    const Admin = lazy(() => import('./admin/App'));

    return <TranslationProvider>
        <BrowserRouter>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to={{pathname: 'pages/home'}}/>}/>
                    <Route path="/admin" render={() => <Admin/>}/>
                    <Route render={() => <Layout routes={routes}/>}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    </TranslationProvider>;
};