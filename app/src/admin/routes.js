import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteWithoutLayout } from 'react-admin';

import Configuration from './Configuration';

export default Layout => [
    <Redirect exact from="/" to="cms/pages/home"/>,
    <Route exact path="/configuration" component={Configuration}/>,
    <RouteWithoutLayout path="/cms/:resource/:id?" component={({match: {params}}) => <Layout {...params}/>}/>
];
